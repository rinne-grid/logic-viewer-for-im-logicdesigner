<template>
    <div id="area">

    </div>
</template>

<script>
    import { ipcRenderer, ipcMain } from 'electron';
    export default {
        name: 'ViewerContext',

        mounted() {
            console.log(app);
            app.ondragstart = (event) => {
                event.preventDefault();
                console.log(event);
                ipcRenderer.send('ondragstart', 'test');
            };
        },
    };
</script>

<style scoped lang="scss">
#area {
    width: 100%;
    height: 1368px;
    max-height: 1368px;
    background-color: green;
    cursor: pointer;
}
</style>
