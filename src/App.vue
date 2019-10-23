<template>
  <div id="app" @dragenter="doDragEnd">
    <p>ファイルを選択</p>
    <input type="file" @change="setFilePath">

<!--    <div id="nav">-->
<!--      <router-link to="/"></router-link>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
<!--    <router-view/>-->
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
  // console.log("app.vue-start");
  // console.log(app);
  // app.ondragstart = (e) => {
  //   e.preventDefault();
  //   console.log("dragstart-");
  // };
  // app.ondragover = (e) => {
  //   e.preventDefault();
  //   console.log("dragover-");
  // };
  // app.ondragenter = (e) => {
  //   e.preventDefault();
  // };
  // app.ondrop = (e) => {
  //   e.preventDefault();
  // };

</script>

