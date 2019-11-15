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
            <ViewerPane></ViewerPane>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ViewerPane from '@/components/ViewerPane.vue';

@Component({
    components: {
        ViewerPane,
    },
})
export default class ViewContext extends Vue {}
</script>

<style scoped lang="scss">

</style>
