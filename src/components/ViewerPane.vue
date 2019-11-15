<template>
    <div class="pane">
        <div class="text-center">
            <div id="viewer_area">
                <span class="icon icon-archive"></span>
            </div>
            <p>IM-LogicDesignerデータを読み込みましょう！</p>
            <button class="btn btn-large btn-positive" @click="openLdDataButtonClick" >im_logicdesigner-data.zipを開く</button>
            <label>
                <input id="open_file_button" type="file" @change="openLdDataSelected">
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import { ipcRenderer } from 'electron';

@Component
export default class ViewerPane extends Vue {
    private VIEWER_STYLE: object = {
        fontSize: '120px',
        color: '#bbb',
    };

    openLdDataButtonClick(): void {
        const openFileButton: any = document.getElementById("open_file_button");
        openFileButton.click();
    }

    openLdDataSelected(e: any) {
        const targetFiles = e.target.files;
        const targetFile = targetFiles[0];
        ipcRenderer.send('load_and_unzip', targetFile.path);
        ipcRenderer.on('load_and_unzip_complete', (event, arg) => {
            console.log(arg);
        });
        // console.log(e.target.files);
        // console.log(targetFile);
        // const unzip = require('unzip');
        // fs.createReadStream(targetFile.path)
        //     .pipe(unzip.Extract( { path: './tmp/'} ))
        //             .promise()
        //             .then( () => {
        //                 console.log("done")
        //             },
        //             e => {
        //                 console.log("error", e);
        //             }
        //
        // );

        // fs.createReadStream(targetFile.path)
        //     .pipe(unzip.Parse())
        //     .on('entry', function(entry){
        //         // const isUnicode = entry.props.flags.isUnicode;
        //         const fileName = entry.path;
        //         if(fileName === "user_definition.json") {
        //             entry.pipe(fs.createWriteStream(fileName));
        //             const rs = fs.createReadStream(fileName);
        //             rs.on('readable', () => {
        //                 const jsonStr = rs.read();
        //                 console.log(jsonStr);
        //                 console.log(JSON.parse(jsonStr));
        //             })
        //         } else {
        //             entry.autodrain();
        //         }
        //     })
        //     .promise()
        //     .then( () => console.log("done"));
            // .on('close', () => {
            //         console.log("ok");
            //     }
            // )
    }

}
</script>

<style scoped>
#viewer_area {
    font-size: 120px;
    color: #bbb;
}

#open_file_button {
    display: none;
}
</style>
