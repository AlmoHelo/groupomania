<template>
  <headerAll />
  <body>
    <h1>Vous êtes sur le profil de {{ pseudo }}</h1>

    <!--affiche les coordonnées du profil-->
    <section class="profil" id="profil">
      {{ errorMessageGetOne }}
      <div class="allInfo">
        <p>Adresse mail : {{ mail }}</p>
        <p>Pseudo : {{ pseudo }}</p>
        <p>Inscrit depuis le : {{ date }}</p>
        <p>Biographie : {{ biographie }}</p>
      </div>
    </section>

    <!-- affiche tous les article-->
    <section id="articlesPerso" class="articlesPerso">
      <h2>Tous les articles</h2>
      {{ errItem }}

      <div v-for="(mess, index) in msg" :key="mess.idMessages">
        <article class="article">
          <div class="headArt">
            <a @click="viewComments(mess.id)" class="myHead">
              <p class="profilArt">{{ mess.pseudoUser }}</p>
              <p class="dateArt">{{ mess.date }}</p>
            </a>
            <div v-if="userAdmin == 1">
              <a @click="deleteIsAdmin(mess.id)" id="reportItem"
                ><i class="fas fa-times"></i
              ></a>
            </div>
          </div>

          <a @click="viewComments(mess.id)">
            <div class="descrip">
              <a
                v-bind:href="'http://localhost:3000/images/' + mess.imageURL"
                class="myLinkPict"
                ><img
                  v-bind:src="'http://localhost:3000/images/' + mess.imageURL"
                  class="myImg"
                  title="Cliquer pour agrandir"
                  v-if="mess.imageURL != null"
              /></a>
              <p class="texte" id="texte">{{ mess.description }}</p>
            </div>
          </a>

          <div class="footArt">
            <div class="like">
              <a
                ><i
                  class="far fa-thumbs-up"
                  id="good"
                  v-on:click="onLike(mess.id, index)"
                ></i></a
              >{{ mess.likes }}
              <a v-on:click="onDislike(mess.id, index)"
                ><i class="far fa-thumbs-down" id="bad"></i></a
              >{{ mess.dislikes }}
            </div>
            <a class="commAccueil" @click="viewComments(mess.id)"
              ><i class="fas fa-comment-dots"></i>
              <p class="nbcomm">
                {{ mess.nbComm }} Commentaire<span v-if="mess.nbComm > 1"
                  >s</span
                >
              </p></a
            >
            <a
              class="signaler"
              @click="report(mess.id)"
              v-if="mess.userId != userId"
              ><i class="far fa-flag"></i
              ><span>Signaler ce commentaire</span></a
            >
          </div>
        </article>
      </div>
    </section>
  </body>
  <footerAll />
</template>

<script>
import axios from "axios";
import headerAll from "../components/headerAll";
import { DATE_FORMAT } from "../service/utility";
import { SEARCH_PICTURE } from "../service/utility";
import footerAll from "../components/footerAll";
export default {
  name: "otherProfil",
  components: { headerAll, footerAll },
  methods: {
    onLike: function (messId, indexI) {
      let valueLike = "like";
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            valueLike: valueLike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          if (response.data.addLike) {
            this.msg[indexI].likes++;
            this.msg[indexI].dislikes--;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDislike: function (messId, indexI) {
      let valueLike = "dislike";
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            valueLike: valueLike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          if (response.data.addLike == false) {
            this.msg[indexI].dislikes++;
            this.msg[indexI].likes--;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    viewComments: function (messId) {
      localStorage.setItem("commentOneItem", messId);
      window.location.href = "http://localhost:8080/comment";
    },
    deleteIsAdmin: function (messId) {
      console.log(messId);
      let user = JSON.parse(localStorage.getItem("user"));
      let profil = localStorage.getItem("searchProfil");
      axios
        .delete(`http://localhost:3000/api/items/${messId}`, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.href = `http://localhost:8080/item/profil/${profil}`;
        })
        .catch((error) => {
          alert("Une erreur s'est produite. Veuillez réessayer la page");
          console.log(error);
        });
    },
    report: function (messId) {
      //signaler un article
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          `http://localhost:3000/api/report/`,
          { itemId: messId, userId: user.userId },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      //for profil
      pseudo: "",
      password: "",
      mail: "",
      date: "",
      biographie: "",
      //for items
      message: "",
      msg: "",
      description: "",
      //for errors
      errorMessageGetOne: "",
      errItem: "",
      userAdmin: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));

    let userOther = localStorage.getItem("searchProfil");

    //récupération profil du user
    axios
      .get("http://localhost:3000/api/auth/profil/" + userOther, {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        this.pseudo = response.data.pseudo;
        this.mail = response.data.email;
        this.userAdmin = user.admin;
        this.date = DATE_FORMAT(response.data.creationDate);
        if (
          response.data.biographie == null ||
          response.data.biographie == ""
        ) {
          this.biographie = "Pas de biographie pour le moment";
        } else {
          this.biographie = response.data.biographie;
        }
        let myPict = document.createElement("img");
        myPict.setAttribute("src", response.data.pictureProfil);
        myPict.style.width = "150px";
        myPict.style.height = "150px";
        myPict.style.margin = "auto";
        let myProfil = document.getElementById("profil");
        myProfil.appendChild(myPict);
      })
      .catch((error) => {
        console.log(error);
        this.errorMessageGetOne =
          "Une erreur s'est produite. Veuillez recharger la page";
      });

    //récupération de ses items
    axios
      .get("http://localhost:3000/api/items/profils/" + userOther, {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        this.msg = response.data.map((element) => {
          if (element.imageURL != null) {
            element.imageURL = SEARCH_PICTURE(element.imageURL);
            return element;
          }
        });
        this.msg = response.data.map((element) => {
          element.date = DATE_FORMAT(element.date);
          return element;
        });
      })
      .catch((error) => {
        console.log(error);
        this.errItem = "Une erreur s'est produite. Veuillez recharger la page";
      });
  },
};
</script>

<style lang="scss" scoped>
.errorMsg {
  color: rgb(124, 51, 51);
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}
.profil,
.modifier,
.newDescription,
.articlesPerso {
  border: 1px solid #c3c3c3;
  width: 60%;
  margin: auto;
  margin-bottom: 50px;
}
.modifier,
.newDescription {
  width: 57%;
}
.profil {
  display: flex;
  flex-direction: row-reverse;
  box-shadow: 0 5px 5px grey;
  & .allInfo {
    width: 50%;
    margin: auto;
  }
  & button {
    margin: 10px;
  }
}
.modifier,
.newDescription {
  display: none;
  padding: 15px;
  justify-content: space-between;
}
.descrip {
  display: flex;
  align-items: center;
  & .myLinkPict {
    margin: 10px 0px 10px 40px;
    max-width: 40%;
  }
  & .myImg {
    border-radius: 5px;
    max-width: 100%;
    max-height: 150px;
  }
  & .texte {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
.articlesPerso {
  border-radius: 5px;
  padding-bottom: 20px;
  & h2 {
    font-size: 25px;
    width: 100%;
  }
  & .article {
    border: 1px solid #d2d2d2c7;
    border-radius: 5px;
    background-color: #dae0e6;
    margin-bottom: 10px;
    & .headArt {
      border-bottom: 1px solid #b6b3b39d;
      & .dateArt {
        margin-left: 30%;
      }
      & .myHead {
        width: 90%;
        margin-left: 10px;
        display: flex;
        align-items: center;
        & .profilArt {
          display: flex;
          align-items: center;
        }
      }
      & .modifSuppItem {
        display: flex;
        justify-content: center;
        width: 10%;
        height: auto;
        & div {
          display: flex;
          align-items: center;
          & i {
            margin-right: 0;
          }
        }
      }
    }
    & .texte {
      padding: 20px;
    }
    & .footArt {
      border-top: 1px solid #b6b3b39d;
      padding: 15px;
    }
    & .headArt,
    .footArt {
      display: flex;
      justify-content: space-around;
    }
    & i {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
}
.buttonMS {
  font-size: 15px;
  border: none;
  background: none;
  color: rgb(209, 63, 63);
}
@media screen and (max-width: 767px) {
  h1 {
    font-size: 25px;
    margin: 30px 0;
  }
  .profil {
    width: 90%;
    font-size: 13px;
    flex-direction: column-reverse;
    justify-content: center;
    & .allInfo {
      margin: auto;
      width: 100%;
    }
    & .modifSupp {
      display: flex;
      margin-top: 20px;
    }
  }
  .newDescription {
    width: 85%;
  }
  .modifier {
    width: 90%;
    padding: 8px;
    & h2 {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    & label,
    .champ {
      font-size: 15px;
    }
    & input,
    textarea {
      height: 20px;
      margin: auto;
      &::placeholder {
        font-size: 12px;
      }
    }
    & button {
      width: 150px;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  .descrip {
    flex-direction: column;
    & .myLinkPict {
      margin: auto;
      margin-top: 10px;
      max-width: 100%;
    }
    & .myImg {
      max-height: 20%;
    }
    & .texte {
      margin-top: 0px;
      margin-bottom: 10px;
    }
  }
  .articlesPerso {
    width: 90%;
    & h2 {
      font-size: 20px;
    }
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  h1 {
    font-size: 30px;
    margin-top: 30px;
  }
  .descrip {
    & .myLinkPict {
      margin: auto;
      margin: 5px;
      max-width: 50%;
      & .myImg {
        max-height: 220px;
      }
    }
  }
}
</style>