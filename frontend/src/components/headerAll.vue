<template>
  <header>
    <a href="/item" class="groupo"
      ><img alt="Vue logo" src="../assets/img/logo-white.png"
    /></a>
    <nav>
      <ul id="menu">
        <a href="/item"> Accueil </a>
        <a class="signaler" id="report" href="/report"> Signalement </a>
        <!--visible que par l'administrateur-->
        <a v-on:click="profil"> Profil </a>
        <a v-on:click="deconnexion"> Deconnexion </a>
      </ul>
    </nav>
  </header>
</template>


<script>
import axios from "axios";
export default {
  name: "headerAll",
  el: "menu",
  mounted() {
    let myUser = JSON.parse(localStorage.getItem("user"));
    if (myUser.admin === 1) {
      let signalement = document.getElementById("report");
      signalement.style.display = "flex";
    }
  },
  methods: {
    profil: function () {
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = user.userId;
      axios
        .get("http://localhost:3000/api/auth/" + userId, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response.data[0]);
          let profil = JSON.stringify(response.data[0]);
          localStorage.setItem("userProfil", profil);
          window.location.href = "http://localhost:8080/items/profil";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deconnexion: function () {
      localStorage.clear();
      window.location.href = "http://localhost:8080/";
    },
  },
};
</script>

<style lang="scss" scoped>
.signaler {
  display: none;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 30px 10px;
  background-image: url("../assets/img/batiment.jpg");
  & .groupo {
    width: 40%;
    & img {
      width: 100%;
      margin: 0;
    }
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
      color: #f6d0d0;
      font-weight: bold;
      text-decoration: none;
      font-family: RocknRollOne, Helvetica, Arial, sans-serif;
    }
  }
}
@media screen and (max-width: 767px) {
  header {
    flex-direction: column;
    margin-bottom: 30px;
    & .groupo {
      width: 100%;
      & img {
        height: auto;
        margin-bottom: 20px;
      }
    }
    & ul {
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      & a {
        margin: 0 10px;
      }
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
      width: 100%;
      font-size: 25px;
      & a {
        margin: 0 30px;
      }
    }
  }
}
</style>