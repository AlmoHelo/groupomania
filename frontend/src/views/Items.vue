<template>
  <headerAll />
  <div class="accueil">
    <div class="articles">
      <div>
        <ul>
          <li>
            <a @click="viewBest" id="linkBest"
              ><i class="fas fa-fire-alt"></i> Best
            </a>
          </li>
          <li>
            <a @click="viewAll" id="linkAll" class="linkAll"
              ><i class="fas fa-globe"></i> Tous</a
            >
          </li>
          <li class="searchUser">
            <input
              type="search"
              placeholder="Rechercher un utilisateur"
              v-model="searchUser"
            />
            <button @click="searchOneUser()">
              <i class="fas fa-check firstCheck"></i
              ><i class="fas fa-check secondCheck"></i>
            </button>
          </li>
        </ul>
      </div>
      <div id="itemAllPage"><itemAll /></div>
      <div id="bestItemPage"><bestItems /></div>
    </div>
    <div class="apropos">
      <div class="imgLog">
        <img src="../assets/img/logo-black.png" class="map" />
        <img src="../assets/img/logo-black2.png" />
      </div>
      <h2>A propos de l'entreprise</h2>
      <section class="employee">
        <p>Nombre d'employés : 620</p>
        <p>Nombre d'inscrits sur le site : {{ nbUser }} {{ errorMessage }}</p>
      </section>
      <h2>Un mot de la direction</h2>
      <p class="text">
        Pour favoriser votre bien-être au travail. Nous avons mis en place ce
        réseau social pour améliorer la communication entre collègues afin de se
        vous connaître dans un cadre plus informel.
      </p>
    </div>
  </div>
  <footerAll />
</template>

<script>
import headerAll from "../components/headerAll";
import itemAll from "../components/itemAll.vue";
import bestItems from "../components/bestItems.vue";
import footerAll from "../components/footerAll";
import axios from "axios";

export default {
  name: "Items",
  components: { headerAll, itemAll, bestItems, footerAll },
  data() {
    return {
      nbUser: "",
      errMessage: "",
      searchUser: "",
    };
  },
  methods: {
    searchOneUser: function () {
      localStorage.setItem("searchProfil", this.searchUser);
      const pseudoProfil = this.searchUser;
      if (this.searchUser == "" || this.searchUser == null) {
        alert("Vous n'avez pas rentrer de nom dans la barre de recherche");
      } else {
        window.location.href = `http://localhost:8080/item/profil/${pseudoProfil}`;
      }
    },
    viewAll: function () {
      let myBest = document.getElementById("bestItemPage");
      let myAll = document.getElementById("itemAllPage");
      myBest.style.display = "none";
      myAll.style.display = "flex";

      let myBestLink = document.getElementById("linkBest");
      myBestLink.style.backgroundColor = "transparent";
      myBestLink.style.border = "none";

      let myAllLink = document.getElementById("linkAll");
      myAllLink.style.border = "1px solid #9da5ad";
      myAllLink.style.backgroundColor = "#9da5ad";
      myAllLink.style.borderRadius = "35px";
      myAllLink.style.padding = "6px";
    },
    viewBest: function () {
      let myBest = document.getElementById("bestItemPage");
      let myAll = document.getElementById("itemAllPage");
      myBest.style.display = "flex";
      myAll.style.display = "none";

      let myBestLink = document.getElementById("linkBest");
      myBestLink.style.border = "1px solid #9da5ad";
      myBestLink.style.backgroundColor = "#9da5ad";
      myBestLink.style.borderRadius = "35px";
      myBestLink.style.padding = "6px";

      let myAllLink = document.getElementById("linkAll");
      myAllLink.style.backgroundColor = "transparent";
      myAllLink.style.border = "none";
    },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/auth/", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        this.nbUser = response.data;
      })

      .catch((error) => {
        console.log(error);
        this.errorMessage = "Error";
      });
  },
};
</script>

<style lang="scss" scoped>
.linkAll:hover {
  & .fa-globe {
    animation: turnGlobe 2s infinite ease-in-out;
  }
}
@keyframes turnGlobe {
  100% {
    transform: rotateY(360deg);
  }
}
.secondCheck {
  position: relative;
  bottom: 103.5%;
  right: 0%;
  &:hover {
    color: rgb(27, 231, 27);
    animation: checkOk 0.5s ease-out;
  }
}
@keyframes checkOk {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.firstCheck:hover {
  animation: checkDontOk 1s ease-out;
}
@keyframes checkDontOk {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.articles {
  width: 60%;
  margin-left: 10%;
  & div ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #d2d2d2c7;
    background-color: white;
    border-radius: 5px;
    width: 88%;
    margin: auto;
    margin-top: 40px;
    padding: 10px;
    & a {
      &:hover {
        border: 1px solid #f6d0d0;
        background-color: #f6d0d0;
        padding: 6px;
        border-radius: 35px;
      }
    }
    & .searchUser {
      width: 60%;
      height: 40px;
      display: flex;
      align-items: center;
      & input {
        width: 90%;
        height: 30px;
        background-color: #d2d2d2c7;
      }
      & button {
        width: 10%;
        border: none;
        background-color: transparent;
        color: black;
        margin: 0;
      }
    }
  }
}
#linkBest {
  border: 1px solid #f6d0d0;
  background-color: #f6d0d0;
  padding: 6px;
  border-radius: 35px;
  &:hover {
    border: 1px solid #f6d0d0;
    background-color: #f6d0d0;
    padding: 6px;
    border-radius: 35px;
  }
}
#itemAllPage {
  display: none;
}
.imgLog {
  block-size: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  max-height: 9%;
  & .map {
    margin-left: 5px;
    margin-right: 10px;
    animation: turnMap 3s infinite ease-in-out;
  }
}
@keyframes turnMap {
  100% {
    transform: rotateZ(360deg);
  }
}
.apropos {
  width: 25%;
  height: 100%;
  margin-left: 20px;
  margin-top: 90px;
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #d2d2d2c7;
  position: fixed;
  right: 3%;
  top: 10%;
  background-color: white;
  & h2 {
    margin-bottom: 50px;
    text-align: start;
    margin-left: 10px;
  }
  & .employee {
    margin-top: 40px;
    margin-bottom: 50px;
    border: none;
    box-shadow: 0px 0px 0px;
    text-align: start;
  }
  & .text {
    width: 90%;
    margin: auto;
    text-align: start;
    margin-bottom: 1em;
  }
}

@media screen and (max-width: 767px) {
  .imgLog {
    & img {
      height: 50px;
    }
    & .map {
      width: 50px;
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  .accueil {
    display: flex;
    flex-direction: column-reverse;
  }
  .articles {
    & div ul {
      width: 90%;
      flex-wrap: wrap;
      & li {
        margin-top: 10px;
      }
      & .searchUser {
        width: 90%;
      }
    }
  }
  .apropos {
    position: initial;
    width: 90%;
    margin-top: 0;
    & h2 {
      font-size: 18px;
      margin-bottom: 20px;
    }
    & .employee,
    .text {
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .articles {
    width: 90%;
    margin: 0;
    margin: auto;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .articles {
    & div ul {
      width: 90%;
      flex-wrap: wrap;
      & li {
        margin-top: 10px;
      }
      & .searchUser {
        width: 90%;
      }
    }
  }
  .imgLog {
    & img {
      height: 50px;
    }
    & .map {
      width: 50px;
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  .apropos {
    width: 40%;
    right: 0px;
    top: 225px;
    & h2 {
      font-size: 15px;
      margin-top: 0;
      margin-bottom: 0px;
    }
    & .employee,
    .text {
      padding: 0;
      font-size: 12px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
  .articles {
    width: 50%;
    margin-left: 40px;
  }
}
</style>