<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group pull-right">
                <button class="btn btn-default" @click.stop="onClipboardButtonClick">
                    <span class="icon icon-clipboard"></span>
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-floppy"></span>
                </button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { clipboard } from 'electron';
@Component
export default class ViewerToolbar extends Vue {
    @Prop()
    public sourceCode!: string;

    public onClipboardButtonClick(e:MouseEvent): void {
        clipboard.writeText(this.sourceCode, 'selection');
        alert('クリップボードにコピーしました。');
    }
}
</script>

<style scoped>
</style>
