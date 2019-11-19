<template>
    <div id="area">
        <div class="pane-group">
            <header class="toolbar toolbar-header">
                <div class="toolbar-actions">
                <div class="btn-group">
                    <button class="btn btn-default" @click="handleOpenLdZipFile">
                        <span class="icon icon-folder"></span>
                    </button>
                </div>
                </div>
            </header>
            <div class="pane pane-one-fourth sidebar">
                <nav class="nav-group">
<!--
  FIXME: ViewerTreeContents子コンポーネントを利用するように変更したい。
     Watch時点でプロパティを更新しているが、その変更が子コンポーネントに行き渡らない？理由はまだ不明
 -->
<!--                        <template v-if="!this.treeDivideType">-->
<!--                            <ViewerTreeContents  :tree-divide-list="treeDivideType.js"></ViewerTreeContents>-->
<!--                        </template>-->
                    <h5 class="nav-group-title">JavaScript</h5>
                    <template v-for="targetData in this.treeDivideType.js">
                        <template v-if="targetData.definitionId === storeCurrentSourceName">
                            <a class="nav-group-item active" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                        <template v-else>
                            <a class="nav-group-item" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                    </template>

                    <h5 class="nav-group-title">SQL</h5>
                    <template v-for="targetData in this.treeDivideType.sql">
                        <template v-if="targetData.definitionId === storeCurrentSourceName">
                            <a class="nav-group-item active" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                        <template v-else>
                            <a class="nav-group-item" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                    </template>
                    <h5 class="nav-group-title">テンプレート</h5>
                    <template v-for="targetData in this.treeDivideType.template">
                        <template v-if="targetData.definitionId === storeCurrentSourceName">
                            <a class="nav-group-item active" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                        <template v-else>
                            <a class="nav-group-item" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                    </template>
                    <h5 class="nav-group-title">REST</h5>
                    <template v-for="targetData in this.treeDivideType.rest">
                        <template v-if="targetData.definitionId === storeCurrentSourceName">
                            <a class="nav-group-item active" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                        <template v-else>
                            <a class="nav-group-item" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                    </template>
                    <h5 class="nav-group-title">その他</h5>
                    <template v-for="targetData in this.treeDivideType.others">
                        <template v-if="targetData.definitionId === storeCurrentSourceName">
                            <a class="nav-group-item active" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                        <template v-else>
                            <a class="nav-group-item" @click="setSelectedSource(targetData)" >
                                <span class="icon icon-pencil"></span>
                                {{targetData.definitionName}}
                            </a>
                        </template>
                    </template>
                </nav>
            </div>
            <ViewerPane ref="viewer_pane"></ViewerPane>
<!-- TODO: 入力・出力パラメータの表示に対応する-->
<!--            <div class="pane pane-one-six">-->
<!--                <div class="window" style="height:100%">-->
<!--                    <header class="toolbar toolbar-header">-->
<!--                      <h1 class="title">入力パラメータ</h1>-->
<!--                    </header>-->
<!--                    <div class="window-content">-->
<!--                        <v-treeview :items="this.currentUserDefinition.definitionData.inputDataDefinition"></v-treeview>-->
<!--                    </div>-->
<!--                    <header class="toolbar toolbar-header">-->
<!--                      <h1 class="title">出力パラメータ</h1>-->
<!--                    </header>-->
<!--                    <div class="window-content">-->
<!--                        <h2>ここにjson</h2>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit } from 'vue-property-decorator';
import ViewerPane from '@/components/ViewerPane.vue';
import ViewerTreeContents from '@/components/ViewerTreeContents.vue';
import UserDefinitionDivideType from '@/classes/UserDefinitionDivideType';
import UserDefinition from '@/interfaces/UserDefinition';

@Component({
    components: {
        ViewerPane,
        ViewerTreeContents,
    },
})
export default class ViewContext extends Vue {
    public $refs!: {
        viewer_pane: ViewerPane,
    };
    private treeDivideType: UserDefinitionDivideType;

    private currentUserDefinition: any;

    constructor() {
        super();
        this.treeDivideType = new UserDefinitionDivideType();
        this.currentUserDefinition = {};
    }
    get storeLdDataUserDefObjDivideType(): UserDefinitionDivideType {
        return this.$store.getters.getLdDataUserDefObjDivideType;
    }

    get storeCurrentSourceName(): string {
        return this.$store.getters.getCurrentSourceName;
    }

    @Watch('storeCurrentSourceName')
    private storeCurrentSourceNameChanged(newName: string, oldName: string) {
        // 現在表示しているソースコードが変わったら、入出力パラメータへの反映を行う
        // TODO: これはViewerPaneにも同じような処理があるので、統合すべき
        this.currentUserDefinition = this.$store.getters.getSourceMapByDefId(newName) as UserDefinition;
        console.log('ViewerContext - this.currentUserDefinition', newName, 'のソースオブジェクトを取得');

    }

    @Watch('storeLdDataUserDefObjDivideType')
    private storeUserDefObjDivType(newObj: any, oldObj: any) {
        console.log('watch:', newObj);
        this.treeDivideType = newObj as UserDefinitionDivideType;
    }

    private handleOpenLdZipFile(): void {
        console.log('handleOpenLdZipFile');
        this.$emit('handle-open-ld-zip-file');
        this.$refs.viewer_pane.openLdDataButtonClick();
        // this.$ref .viewerPane.openLdDataButtonClick();
    }

    private setSelectedSource(targetObj: UserDefinition) {
        this.$store.dispatch('setCurrentSourceName', targetObj.definitionId);
        const targetSourceMap: any = {};
        targetSourceMap[targetObj.definitionId] = targetObj;
        this.$store.dispatch('addSelectedSourceMap', targetSourceMap);
    }
}
</script>

<style scoped lang="scss">

</style>
