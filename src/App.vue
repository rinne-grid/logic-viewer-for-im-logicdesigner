<template>
  <div id='app'>
    <div id='nav'>
      <router-link to='/'></router-link>
<!--      <router-link to='/'>Home</router-link> |-->
<!--      <router-link to='/about'>About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
  };

  console.log('app.vue-start');
  console.log(app);
  app.ondragstart = (e) => {
    e.preventDefault();
    console.log('dragstart-');
  };
  app.ondragover = (e) => {
    e.preventDefault();
    console.log('dragover-');
  };
  app.ondragenter = (e) => {
    e.preventDefault();
  };
  app.ondrop = (e) => {
    e.preventDefault();
  };
</script>

