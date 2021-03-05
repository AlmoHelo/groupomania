<template>
  <header>
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <ul id="menu">
      <a href="/item"> Accueil </a>
      <a href="/items/profil"> Profil </a>
      <a v-on:click="deconnexion"> Deconnexion </a>
    </ul>
  </header>
</template>

<script>
export default {
  name: "headerAll",
  el: "menu",
  methods: {
    deconnexion: function () {
      localStorage.clear();
      window.location.href = "http://localhost:8080/";
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 30px 10px;
  background-image: url("../assets/img/batiment.jpg");
  & img {
    width: 25%;
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
      color: black;
      font-weight: bold;
      text-decoration: none;
    }
  }
}
@media screen and (max-width: 767px) {
  header {
    flex-direction: column;
    margin-bottom: 30px;
    & img {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
    & ul {
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  header {
    flex-direction: column;
    & img {
      width: 100%;
      height: auto;
      margin-bottom: 50px;
    }
    & ul {
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      font-size: 25px;
    }
  }
}
</style>