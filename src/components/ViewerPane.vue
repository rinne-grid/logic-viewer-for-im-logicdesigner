<template>
    <div class="pane">
        <input id="open_file_button" type="file" @change="openLdDataSelected">
        <template v-if="!this.isLdDataLoaded">
            <div class="text-center" id="app-top">
                <div id="viewer_area">
                    <span class="icon icon-archive"></span>
                </div>
                <p>LogicViewer for IM-LogicDesignerへようこそ。<br>IM-LogicDesignerのデータを確認しましょう！</p>
                <button class="btn btn-large btn-positive" @click="openLdDataButtonClick" >im_logicdesigner-data.zipを開く</button>
            </div>
        </template>
        <template v-if="this.isLdDataLoaded">
            <ViewerToolbar :user-definition="this.currentUserDefinition" :source-code="this.currentUserSourceCodeRaw"></ViewerToolbar>
                <div class="pane">
                    <div class="tab-group">
                        <template v-for="targetKey in Object.keys(storeSelectedSourceMap)">
                            <template v-if="currentUserDefinition && getStoreSourcePrimaryKey(storeSelectedSourceMap[targetKey]) === getStoreSourcePrimaryKey(currentUserDefinition)">
                                 <div class="tab-item active" @click="openSourceTab(targetKey)">
                                    (v{{ storeSelectedSourceMap[targetKey].version }}) {{ storeSelectedSourceMap[targetKey].definitionName }}
                                    <span class="icon icon-cancel icon-close-tab" @click="closeSourceTab(targetKey)"></span>
                                </div>
                            </template>
                            <template v-else>
                                 <div class="tab-item" @click="openSourceTab(targetKey)">
                                    (v{{ storeSelectedSourceMap[targetKey].version }}) {{ storeSelectedSourceMap[targetKey].definitionName }}
                                    <span class="icon icon-cancel icon-close-tab" @click="closeSourceTab(targetKey)"></span>
                                </div>
                            </template>

                        </template>
                    </div>
                </div>
            <template v-if="currentUserSourceCode">
                <pre class="rngd-pane" id="code_body"><code v-html="this.currentUserSourceCode"></code></pre>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import * as fs from 'fs';
import { ipcRenderer } from 'electron';

import { Vue, Component, Watch, Emit } from 'vue-property-decorator';
import * as hljs from 'highlight.js';
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));

const jsonBeautify = require('json-beautify');

import UserDefinition from '@/interfaces/UserDefinition';
import ViewerToolbar from '@/components/ViewerToolbar.vue';
@Component({
    components: {
        ViewerToolbar,
    },
})
export default class ViewerPane extends Vue {
    private VIEWER_STYLE: object = {
        fontSize: '120px',
        color: '#bbb',
    };

    private currentUserDefinition: any;
    private currentUserSourceCode: string;
    private currentUserSourceCodeRaw: string;

    constructor() {
        super();
        this.currentUserDefinition = null;
        this.currentUserSourceCode = '';
        this.currentUserSourceCodeRaw = '';

    }
    public openLdDataButtonClick(): void {
        const openFileButton: any = document.getElementById('open_file_button');
        openFileButton.click();
    }

    get isLdDataLoaded(): boolean {
        return this.$store.getters.getLdDataLoaded;
    }

    get storeCurrentSourceName(): string {
        return this.$store.getters.getCurrentSourceName;
    }

    get storeSelectedSourceMap() {
        return this.$store.getters.getSelectedSourceMap;
    }

    private getStoreSourcePrimaryKey(targetObj: UserDefinition) {
        return this.$store.getters.getSourcePrimaryKeyByObj(targetObj);
    }

    @Watch('storeCurrentSourceName')
    private isCurrentSourceNameChanged(newSourceName: string, oldSourceName: string) {
        console.log('isCurrentSourceNameChanged---start');
        this.currentUserDefinition = this.$store.getters.getSourceMapByDefId(newSourceName);
        let currentUserSourceCode = '';

        if (this.currentUserDefinition !== undefined) {

            let codeType = this.currentUserDefinition.definitionType;
            switch (codeType) {
                case 'rest':
                    codeType = 'json';
                    currentUserSourceCode = jsonBeautify(
                        this.currentUserDefinition.definitionData.elementProperties,
                        null, 2, 80);
                    break;
                case 'template':
                    codeType = 'python';
                    currentUserSourceCode = this.currentUserDefinition.definitionData.elementProperties.defaultTemplate;
                    break;
                case 'others':
                    codeType = 'json';
                    currentUserSourceCode = jsonBeautify(
                        this.currentUserDefinition.definitionData.elementProperties,
                        null, 2, 80);
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
            this.currentUserSourceCodeRaw = currentUserSourceCode;
        }
        console.log('isCurrentSourceNameChanged---end');
    }

    private openLdDataSelected(e: any) {
        const targetFiles = e.target.files;
        if (targetFiles) {
            const targetFile = targetFiles[0];
            ipcRenderer.send('load_and_unzip', targetFile.path);
            ipcRenderer.once('load_and_unzip_complete', (event, path) => {
                ipcRenderer.send('load_json', path);
                ipcRenderer.once('load_json_complete', (loadJsonEvent, jsonObj) => {
                    // console.log(jsonObj);
                    const userDefStrList = jsonObj.userDefinitions;
                    const userDefObjList: UserDefinition[] =
                        userDefStrList.map((defStr: string) => JSON.parse(defStr) as UserDefinition);

                    this.$store.dispatch('setLdDataSource', jsonObj);
                    this.$store.dispatch('setLdDataUserDefList', userDefObjList);
                    // console.log(userDefObjList);
                    this.$store.dispatch('setLdDataLoaded', true);
                });
            });
        }
    }

    private openSourceTab(sourceId: string) {
        this.$store.dispatch('setCurrentSourceName', sourceId);
    }

    private closeSourceTab(sourceId: string) {
        console.log('削除対象のソースID', sourceId);
        this.$store.dispatch('removeSelectedSourceMap', sourceId);
        const selectedSourceMap = this.$store.getters.getSelectedSourceMap;
        let fallbackSourceName = '';
        if (Object.keys(selectedSourceMap).length === 0) {
            this.currentUserSourceCode = '';
            this.currentUserDefinition = {};

        } else {
            const lastSourceIndex = Object.keys(selectedSourceMap).length - 1;

            Object.keys(selectedSourceMap).forEach( (currentKey, index) => {
                // 最後に追加したソースコードを表示する
                if (index === lastSourceIndex) {
                    fallbackSourceName = `${selectedSourceMap[currentKey].definitionId}${selectedSourceMap[currentKey].version}`;
                }
            });
            console.log('fallbackソース名', fallbackSourceName);
            this.currentUserDefinition = this.$store.getters.getSourceMapByDefId(fallbackSourceName);
        }
        this.$store.dispatch('setCurrentSourceName', fallbackSourceName);

    }
}
</script>

<style lang="scss" scoped>
#viewer_area {
    font-size: 150px;
    color: #bbb;
}

#open_file_button {
    display: none;
}

#code_body {
    padding: 12px;
}

.pane {
    overflow-y: visible;
}

.rngd-pane {
    overflow-y: scroll;
    height: 94%;
    margin-top: 0px;
}

#app-top {
    position: absolute;
    top: 20%;
    left: 20%;
    height: 100%;
    p {
        font-size: 1.6rem;
    };

    button {
        font-size: 1.0rem;
    }
}
</style>
