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
import { ipcRenderer } from 'electron';
import UserDefinition from '@/interfaces/UserDefinition';

@Component
export default class ViewerPane extends Vue {
    private VIEWER_STYLE: object = {
        fontSize: '120px',
        color: '#bbb',
    };

    private openLdDataButtonClick(): void {
        const openFileButton: any = document.getElementById('open_file_button');
        openFileButton.click();
    }

    private openLdDataSelected(e: any) {
        const targetFiles = e.target.files;
        const targetFile = targetFiles[0];
        ipcRenderer.send('load_and_unzip', targetFile.path);
        ipcRenderer.on('load_and_unzip_complete', (event, path) => {
            console.log(path);
            ipcRenderer.send('load_json', path);
            ipcRenderer.on('load_json_complete', (loadJsonEvent, jsonObj) => {
                // console.log(jsonObj);
                const userDefStrList = jsonObj.userDefinitions;
                const userDefObjList: UserDefinition[] =
                    userDefStrList.map( (defStr: string) => JSON.parse(defStr) as UserDefinition);

                this.$store.dispatch('setLdDataSource', jsonObj);
                this.$store.dispatch('setLdDataUserDefList', userDefObjList);
                // console.log(userDefObjList);

            });
        });
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
