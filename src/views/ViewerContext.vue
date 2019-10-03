<template>
    <div id="area">
        a
    </div>
</template>

<script>
    import { ipcRenderer, ipcMain } from 'electron'
    export default {
        name: 'ViewerContext',

        mounted() {
            console.log(app);
            app.ondragstart = (event) => {
                event.preventDefault();
                console.log(event);
                ipcRenderer.send("ondragstart", "test");
            };
        },
    };
</script>

<style scoped type="scss">
#area {
    width: 100%;
    height: 100%;
    background-color: green;
}
</style>
