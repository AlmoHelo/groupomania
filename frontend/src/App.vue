<template>
  <router-view />
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  background: linear-gradient(to bottom right, rgb(209, 208, 208), #dae0e6);
  margin: 0;
}
@font-face {
  font-family: "Nunito";
  src: url("assets/polices/Nunito-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "RocknRollOne";
  src: url("assets/polices/RocknRollOne-Regular.ttf") format("truetype");
}
* {
  font-family: Nunito, Helvetica, Arial, sans-serif;
}
</style>
