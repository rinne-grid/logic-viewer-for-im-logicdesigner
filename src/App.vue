<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods: {
      doDragEnd: (e) => {
        console.log(e);
      },
      setFilePath: (e) => {
        // this.filePath = e.target.files;
        console.log(e.target.files)
      }
    }
  }

</script>

