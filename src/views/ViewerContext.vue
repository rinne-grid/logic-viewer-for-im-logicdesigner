<template>
    <div id="area">
        <div class="pane-group">
            <div class="pane-sm sidebar">
                <nav class="nav-group">
                    <h5 class="nav-group-title">JavaScript</h5>
                    <h5 class="nav-group-title">SQL</h5>
                    <h5 class="nav-group-title">REST</h5>
                </nav>
            </div>
            <div class="pane">
                <div class="text-center">
                    <div id="viewer_area">
                        <span class="icon icon-archive"></span>
                    </div>
                    <p>IM-LogicDesignerデータを読み込みましょう！</p>
                    <button class="btn btn-large btn-positive" @click="openLdDataButtonClick" >logicdesigner-data.zipを開く</button>
                    <label>
                        <input id="open_file_button" type="file" @change="openLdDataSelected">
                    </label>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ViewContext extends Vue {
    private VIEWER_STYLE: object = {
        fontSize: '120px',
        color: '#bbb',
    };

    openLdDataButtonClick(): void {
        const openFileButton: any = document.getElementById("open_file_button");
        openFileButton.click();
    }

    openLdDataSelected(e: any): void {
        console.log(e.target.files);
        console.log(e);
    }
}
</script>

<style scoped lang="scss">
#viewer_area {
    font-size: 120px;
    color: #bbb;
}

#open_file_button {
    display: none;
}
</style>
