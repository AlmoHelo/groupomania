<template>
  <header>
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <ul id="menu">
      <a href="/item"> Accueil </a>
      <a v-on:click="profil"> Profil </a>
      <a v-on:click="deconnexion"> Deconnexion </a>
    </ul>
  </header>
</template>

<script>
import axios from "axios";
export default {
  name: "headerAll",
  el: "menu",
  methods: {
    profil: function () {
      //Appel à l'api pour l'affichage de tous les messages
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = user.reponse.userId;
      axios
        .get("http://localhost:3000/api/auth/" + userId, {
          headers: {
            authorization: "Bearer " + user.reponse.token,
          },
        })
        .then((response) => {
          console.log(response.data[0]);
          let profil = JSON.stringify(response.data[0]);
          localStorage.setItem("userProfil", profil);
          window.location.href = "http://localhost:8080/items/profil/";
        })
        .catch((error) => console.log(error));
    },
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