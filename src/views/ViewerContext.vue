<template>
    <div id="area">
        <div class="pane-group">
            <div class="pane pane-one-third sidebar">
                <nav class="nav-group">
                    <h5 class="nav-group-title">JavaScript</h5>
                    <template v-for="targetData in this.treeDivideType.js">
                        <span class="nav-group-item">
                            <span class="icon icon-pencil"></span>
                            {{targetData.definitionName}}
                        </span>
                    </template>
<!--
  FIXME: ViewerTreeContents子コンポーネントを利用するように変更したい。
     Watch時点でプロパティを更新しているが、その変更が子コンポーネントに行き渡らない？理由はまだ不明
 -->
<!--                        <template v-if="!this.treeDivideType">-->
<!--                            <ViewerTreeContents v-model="treeDivideType.js"></ViewerTreeContents>-->
<!--                        </template>-->
                    <h5 class="nav-group-title">SQL</h5>
                    <template v-for="targetData in this.treeDivideType.sql">
                        <span class="nav-group-item">
                            <span class="icon icon-pencil"></span>
                            {{targetData.definitionName}}
                        </span>
                    </template>
                    <h5 class="nav-group-title">REST</h5>
                    <template v-for="targetData in this.treeDivideType.rest">
                        <span class="nav-group-item">
                            <span class="icon icon-pencil"></span>
                            {{targetData.definitionName}}
                        </span>
                    </template>
                    <h5 class="nav-group-title">その他</h5>
                    <template v-for="targetData in this.treeDivideType.others">
                        <span class="nav-group-item">
                            <span class="icon icon-pencil"></span>
                            {{targetData.definitionName}}
                        </span>
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
    @Watch('storeLdDataUserDefObjDivideType')
    private storeUserDefObjDivType(newObj: any, oldObj: any) {
        console.log('watch:', newObj);
        this.treeDivideType = newObj as UserDefinitionDivideType;
    }
}
</script>

<style scoped lang="scss">

</style>
