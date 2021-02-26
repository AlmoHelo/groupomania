<template>
  <header>
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <div class="search"><span>🔍</span><input type="search" /></div>
    <ul id="menu">
      <a href="/item"> Accueil </a>
      <a href="#"> Profil </a>
      <a v-on:click="deconnexion"> Deconnexion </a>
    </ul>
  </header>
</template>

<script>
export default {
  name: "headerAll",
  el: "menu",
  methods: {
    deconnexion: function (){
      localStorage.removeItem("user")
      window.location.href = "http://localhost:8080/"
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  & img {
    width: 20%;
    height: 70px;
    margin: 0;
  }
  & .search {
    width: 40%;
    display: flex;
    align-items: center;
    & input {
      width: 100%;
      height: 30px;
      background-color: rgb(148, 147, 147);
      border: none;
    }
  }
  & ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    & a {
      color: white;
      text-decoration: none;
    }
  }
}
</style>