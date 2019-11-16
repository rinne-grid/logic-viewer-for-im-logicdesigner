'use strict';

import {app, protocol, BrowserWindow, ipcMain, ipcRenderer, dialog, Menu} from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import * as unzipper from 'unzipper';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
    nodeIntegration: true,
  } });


  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            dialog.showOpenDialog({properties: ['openFile']}, (filePath: string) => {
              win!.webContents.send('open_file', filePath);
            });
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    console.log(process.env.WEBPACK_DEV_SERVER_URL);

    if (!process.env.IS_TEST) {
        win.webContents.openDevTools();


        BrowserWindow.addDevToolsExtension(
            path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.2_0'),
        );
    }
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

// 20191003追加
ipcMain.on('ondragstart', (event, msg) => {
    console.log(msg);
});


ipcMain.on('load_and_unzip', (event, filePath) => {
    if (!fs.existsSync('./tmp')) {
        fs.mkdirSync('./tmp');
    }
    let targetPath = '';
    fs.createReadStream(filePath)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
            const fileName = entry.path;
            console.log(fileName);
            if ( fileName === 'user_definition.json') {
                entry.pipe(fs.createWriteStream(`./tmp/${fileName}`));
                console.log(entry.path);
                targetPath = `./tmp/${fileName}`;
            } else {
                entry.autodrain();
            }
        })
        .on('finish', () => {
            console.log('finish');
        })
        .promise()
        .then(() => {
            console.log('done');
            event.sender.send('load_and_unzip_complete', targetPath);
        });
});

ipcMain.on('load_json', (event, filePath) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const jsonStr = data;
        const jsonObj = JSON.parse(data);
        console.log(jsonObj);
        event.sender.send('load_json_complete', jsonObj);
    });
});
