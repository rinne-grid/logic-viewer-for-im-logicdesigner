<template>
    <div id="area">
        <div class="pane-group">
            <div class="pane pane-one-third sidebar">
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

            <ViewerPane></ViewerPane>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
    private treeDivideType: UserDefinitionDivideType;

    constructor() {
        super();
        this.treeDivideType = new UserDefinitionDivideType();
    }
    get storeLdDataUserDefObjDivideType(): UserDefinitionDivideType {
        return this.$store.getters.getLdDataUserDefObjDivideType;
    }

    get storeCurrentSourceName(): string {
        return this.$store.getters.getCurrentSourceName;
    }

    @Watch('storeLdDataUserDefObjDivideType')
    private storeUserDefObjDivType(newObj: any, oldObj: any) {
        console.log('watch:', newObj);
        this.treeDivideType = newObj as UserDefinitionDivideType;
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
