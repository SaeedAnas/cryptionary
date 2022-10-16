<template>
  <div class="#app">
    <Home/>
  </div>
</template>

<script>

import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
html {
  font-family: Roboto, "Open Sans", sans-serif;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size:10px;
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: Roboto, "Open Sans", sans-serif;
  font-weight: 400;
  text-align: left;
  width: 100%;
  height: 100%;
}

ul,
ol {
  margin: 0;
}

p {
  margin: 0;
  padding: 0;
}
</style>
