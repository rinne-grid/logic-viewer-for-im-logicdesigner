<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group pull-right">
                <button class="btn btn-default" @click="onClipboardButtonClick">
                    <span class="icon icon-clipboard"></span>
                </button>
                <button class="btn btn-default" @click="onSaveButtonClick">
                    <span class="icon icon-floppy"></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { clipboard } from 'electron';
import * as fs from 'fs';
import UserDefinition from '@/interfaces/UserDefinition';
import RngdUtil from '@/classes/RngdUtil';

const remote = require('electron').remote;
const { dialog } = require('electron').remote;
@Component
export default class ViewerToolbar extends Vue {
    @Prop()
    public sourceCode!: string;

    @Prop()
    public userDefinition!: UserDefinition;

    public onClipboardButtonClick(e: MouseEvent): void {
        clipboard.writeText(this.sourceCode, 'selection');
        alert('クリップボードにコピーしました。');
    }

    public onSaveButtonClick(e: MouseEvent): void {
        if (this.userDefinition) {
            const window = remote.getCurrentWindow();
            const targetExtension = RngdUtil.userDefinitionType2Extension(this.userDefinition.definitionType);
            const options = {
                title: '名前をつけて保存',
                defaultPath: this.userDefinition.definitionName + '.' + targetExtension,
                filters: [
                    {name: 'All files', extensions: ['*']},
                ],
                properties: ['openFile'],
            };
            const doSaveSourceCode = this.sourceCode;
            dialog.showSaveDialog(window, options).then((result) => {
                if (!result.canceled) {
                    const filePath: string = result.filePath as string;
                    fs.writeFileSync(filePath, doSaveSourceCode, 'utf-8');
                }

            });
        }
    }
}
</script>

<style scoped>
</style>
