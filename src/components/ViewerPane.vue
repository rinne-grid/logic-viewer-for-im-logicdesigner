<template>
    <div class="pane">
        <template v-if="!this.isLdDataLoaded">
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
        </template>
        <template v-if="this.isLdDataLoaded">
            <template v-if="currentUserSourceCode">
                <pre id="code_body"><code v-html="this.currentUserSourceCode"></code></pre>
            </template>
        </template>
<!--                    <div class="pane">-->
<!--                <table class="table-striped">-->
<!--                    <thead>-->
<!--                        <tr>-->
<!--                            <th>入力パラメータ名</th>-->
<!--                            <th>入力パラメータ型</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                </table>-->
<!--            </div>-->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import * as fs from 'fs';
import { ipcRenderer } from 'electron';
import UserDefinition from '@/interfaces/UserDefinition';
import * as hljs from 'highlight.js';
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));

@Component
export default class ViewerPane extends Vue {
    private VIEWER_STYLE: object = {
        fontSize: '120px',
        color: '#bbb',
    };

    private currentUserDefinition: any;
    private currentUserSourceCode: string;

    constructor() {
        super();
        this.currentUserDefinition = null;
        this.currentUserSourceCode = '';

    }

    get isLdDataLoaded(): boolean {
        return this.$store.getters.getLdDataLoaded;
    }

    get storeCurrentSourceName(): string {
        return this.$store.getters.getCurrentSourceName;
    }

    @Watch('storeCurrentSourceName')
    private isCurrentSourceNameChanged(newSourceName: string, oldSourceName: string) {
        this.currentUserDefinition = this.$store.getters.getSourceMapByDefId(newSourceName);
        let currentUserSourceCode = '';

        let codeType = this.currentUserDefinition.definitionType;
        switch (codeType) {
            case 'rest':
                codeType = 'json';
                currentUserSourceCode = JSON.stringify(this.currentUserDefinition.definitionData.elementProperties);
                break;
            case 'template':
                codeType = 'python';
                currentUserSourceCode = this.currentUserDefinition.definitionData.elementProperties.defaultTemplate;
                break;
            case 'others':
                codeType = 'json';
                currentUserSourceCode = JSON.stringify(this.currentUserDefinition.definitionData.elementProperties);
                break;
            case 'javascript':
                currentUserSourceCode = this.currentUserDefinition.definitionData.elementProperties.script;
                break;
            case 'sql':
                currentUserSourceCode = this.currentUserDefinition.definitionData.elementProperties.query;
                break;
        }
        const highlightedCode = hljs.highlight(codeType, currentUserSourceCode).value;
        this.currentUserSourceCode = highlightedCode;
    }

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
                this.$store.dispatch('setLdDataLoaded', true);

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

#code_body {
    padding: 12px;
}

</style>
