
<template v-for="targetData in this.treeDivideList">
    <span class="nav-group-item">
        <span class="icon icon-pencil"></span>
        {{targetData.definitionName}}
    </span>
</template>


<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class ViewerTreeContents extends Vue {
    @Prop()
    private treeDivideList!: [];
}
</script>

<style scoped>
</style>
