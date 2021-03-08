<template>
  <headerAll />
  <h1>Les commentaires de l'article :</h1>
  {{ errorMessageItem }}
  <div id="articles" class="msg" v-for="mess in msg" :key="mess.idMessages">
    <article class="theArticle">
      <div class="headArt">
        <p>{{ mess.pseudoUser }}</p>
        <p>{{ mess.date }}</p>
      </div>
      <p class="texte">{{ mess.description }}</p>
      <div class="footArt">
        <div class="like">
          <a><i class="far fa-thumbs-up" v-on:click="onLike(mess.id)"></i></a
          >{{ mess.likes }}
          <!--v-bind:style="{ color: activeColor }"-->
          <a v-on:click="onDislike(mess.id)"
            ><i class="far fa-thumbs-down"></i></a
          >{{ mess.dislikes }}
        </div>
        <a><i class="fas fa-comment-dots"></i>Commentaires</a>
        <a class="signaler"
          ><i class="far fa-flag"></i><span>Signaler ce commentaire</span></a
        >
      </div>
    </article>
  </div>
  {{ nothingComm }}
  {{ errMessage }}
  <button @click="addComm()" id="buttonModif">
    <i class="fas fa-plus" id="add"></i>Ajouter un commentaire
  </button>

  <!--ajouter un commentaire-->
  <div id="formComm" class="formComm">
    <div id="formC" class="formC">
      <h2>Ajouter un commentaire</h2>
      <div class="user">
        <label>Votre pseudo :</label>
        <p>{{ pseudoUserComm }}</p>
      </div>
      <label>Description*:</label
      ><textarea
        name="description"
        id="descriptionComm"
        v-model="descriptionComm"
        required
      />
      {{ errMsg }}

      <button type="submit" @click="sendNewComm()">Envoyer</button>
    </div>
  </div>

  <!--modifier un commentaire-->
  <div id="newDescripComm" class="newDescripComm">
    <div class="form">
      <label> Nouvelle description :</label>
      <textarea
        name="description"
        v-model="description"
        id="description"
        required
      />
      <p class="errorMessage">{{ errUpdateItem }}</p>
      <button @click="sendUpdateComm()" id="sendUpdateItem">Envoyer</button>
    </div>
    <a @click="closeFormUpdate()"><i class="fas fa-times"></i></a>
  </div>

  <!-- affichage de tous les commentaires -->
  <div class="theComments">
    {{ errDeleteComm }}
    <div
      id="commentaires"
      class="comm"
      v-for="mess in comm"
      :key="mess.idComments"
    >
      <article class="comment">
        <div class="headComm">
          <p>{{ mess.pseudoUserComm }}</p>
          <p>{{ mess.dateComm }}</p>
        </div>
        <p class="texte">{{ mess.descriptionComm }}</p>
      </article>
      <div class="icons">
        <a @click="updateComm(mess.idComment, mess.pseudoUserComm)"
          ><i class="far fa-edit"></i
        ></a>
        <a @click="deleteComm(mess.idComment, mess.pseudoUserComm)"
          ><i class="fas fa-times"></i
        ></a>
      </div>
    </div>
  </div>
  <footerAll />
</template>

<script>
import axios from "axios";
import { DATE_FORMAT } from "../service/utility";
import headerAll from "../components/headerAll";
import footerAll from "../components/footerAll";
export default {
  name: "comments",
  components: {
    headerAll,
    footerAll,
  },
  methods: {
    addComm: function () {
      let myForm = document.getElementById("formComm");
      myForm.style.display = "flex";
      let user = JSON.parse(localStorage.getItem("user"));
      this.pseudoUserComm = user.reponse.pseudo;
      let myButton = document.getElementById("buttonModif");
      myButton.style.display = "none";
    },
    sendNewComm: function () {
      let tableau = localStorage.getItem("user");
      let tab = JSON.parse(tableau);
      let token = tab.reponse.token;
      axios
        .post(
          "http://localhost:3000/api/comments/",
          {
            itemId: localStorage.getItem("commentOneItem"),
            userCommId: JSON.parse(localStorage.getItem("user")).reponse.userId,
            description: this.descriptionComm,
            pseudoUserComm: JSON.parse(localStorage.getItem("user")).reponse
              .pseudo,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ` + token, //Renvoie du token par l'api en cas d'authentification
            },
          }
        )
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/comment/";
        })
        .catch(() => {
          console.log("l'envoi a échouée"); //En cas d'echec envoie de l'information à l'utilisateur
          this.errMsg = "L'envoie a échoué ! Veuillez réessayer !";
        });
    },
    updateComm: function (messId, pseudo) {
      localStorage.setItem("updateComm", messId);
      let myPseudo = JSON.parse(localStorage.getItem("user")).reponse.pseudo;
      if (pseudo == myPseudo) {
        let myForm = document.getElementById("newDescripComm");
        myForm.style.display = "flex";
      } else {
        this.errDeleteComm =
          "Vous n'êtes pas autoriser à modifier ce commentaire";
      }
    },
    sendUpdateComm: function () {
      let myId = JSON.parse(localStorage.getItem("updateComm"));
      let token = JSON.parse(localStorage.getItem("user")).reponse.token;

      axios
        .put(
          `http://localhost:3000/api/comments/${myId}`,
          {
            description: this.description,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ` + token, //Renvoie du token par l'api en cas d'authentification
            },
          }
        )
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/comment/";
        })
        .catch((err) => {
          console.log(err);
          this.errDeleteComm =
            "Une erreur s'est produite lors de la modification. Veuillez réessayer !";
        });
    },
    closeFormUpdate: function () {
      let myForm = document.getElementById("newDescripComm");
      myForm.style.display = "none";
    },
    deleteComm: function (messId, pseudo) {
      let myPseudo = JSON.parse(localStorage.getItem("user")).reponse.pseudo;
      let itemId = JSON.parse(localStorage.getItem("commentOneItem"));
      let token = JSON.parse(localStorage.getItem("user")).reponse.token;
      if (pseudo == myPseudo) {
        if (confirm("Confirmez la suppression de votre commentaire")) {
          axios
            .delete(
              `http://localhost:3000/api/comments/${messId}`,
              {
                itemId: itemId,
              },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ` + token, //Renvoie du token par l'api en cas d'authentification
                },
              }
            )
            .then((response) => {
              console.log(response);
              window.location.href = "http://localhost:8080/comment/";
            })
            .catch((err) => {
              console.log(err);
              this.errDeleteComm =
                "Une erreur s'est produite lors de la suppression. Veuillez réessayer !";
            });
        }
      } else {
        this.errDeleteComm =
          "Vous n'êtes pas autoriser à supprimer ce commentaire";
      }
    },
  },
  data() {
    return {
      message: "",
      msg: "",
      comment: "",
      comm: "",
      nothingComm: "",
      errMessage: "",
      pseudoUserComm: "",
      descriptionComm: "",
      errMsg: "",
      errDeleteComm: "",
      description: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    let idItem = JSON.parse(localStorage.getItem("commentOneItem"));
    //récupère un article
    axios
      .get(`http://localhost:3000/api/items/${idItem}`, {
        headers: {
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((response) => {
        this.msg = response.data.map((element) => {
          element.date = DATE_FORMAT(element.date);
          return element;
        });
        //croix sur module pour modifier le profil
        let myDiv = document.getElementById("formComm");
        let myCross = document.createElement("i");
        myCross.className = "fa fa-times";
        myCross.style.margin = "10px 10px 0 0";
        myDiv.appendChild(myCross);
        myCross.addEventListener("click", () => {
          let myForm = document.getElementById("formComm");
          myForm.style.display = "none";
          let myButton = document.getElementById("buttonModif");
          myButton.style.display = "inline-block";
        });
      })
      .catch((error) => {
        this.errorMessageItem =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
      });
    //récupère tous les commentaires
    axios
      .get(`http://localhost:3000/api/comments/all/${idItem}`, {
        headers: {
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data == [] || res.data == "" || res.data == null) {
          this.nothingComm = "Aucuns commentaires pour cet article !";
        } else {
          this.comm = res.data.map((element) => {
            element.dateComm = DATE_FORMAT(element.dateComm);
            return element;
          });
        }
      })
      .catch((error) => {
        this.errorMessage =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.theArticle {
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  background-color: #dae0e6;
  width: 60%;
  margin: auto;
  & .headArt {
    border-bottom: 1px solid #b6b3b39d;
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

.theComments {
  border-bottom: none;
  border-radius: 5px;
  width: 60%;
  margin: auto;
  & .comm {
    border: 1px solid #b6b3b39d;
    background-color: #dae0e6;
    border-radius: 5px;
    display: flex;
    margin-bottom: 10px;
    & .comment {
      width: 96%;
    }
    & .icons {
      display: flex;
      height: 100%;
      border-bottom: 1px solid #b6b3b39d;
      & i {
        margin: 10px 10px 25px 0;
      }
    }
    & .headComm {
      border-bottom: 1px solid #b6b3b39d;
      display: flex;
      justify-content: space-around;
    }
    & .texte {
      padding: 20px;
    }
  }
}

button {
  &:hover i {
    animation: turnAdd infinite linear 1s;
  }
  width: auto;
  height: inherit;
  margin-top: 50px;
  margin-bottom: 50px;
  & i {
    margin-right: 10px;
  }
}
.formComm,
.newDescripComm {
  display: none;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  width: 60%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #dae0e6;
}
.formC {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  & .user {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    & p {
      margin-left: 20px;
    }
  }
  & h2 {
    margin: 40px 0;
  }
  & label {
    font-size: 20px;
    text-align: start;
  }
  & textarea {
    height: 60px;
    margin: 20px 0;
    background-color: #c3c3c3;
  }
  & button {
    width: 200px;
    height: 40px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
.newDescripComm {
  & .form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    margin-top: 50px;
    & label {
      font-size: 30px;
      text-align: start;
    }
    & textarea {
      height: 60px;
      margin: 20px 0;
      background-color: #c3c3c3;
    }
  }
  & i {
    margin: 10px 10px 0 0;
  }
  & button {
    width: 200px;
    height: 40px;
    margin: auto;
    margin-bottom: 50px;
  }
}

@keyframes turnAdd {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  25% {
    transform: rotate3d(0, 0, 1, 90deg);
  }
  50% {
    transform: rotate3d(0, 0, 1, 180deg);
  }
  75% {
    transform: rotate3d(0, 0, 1, 270deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@media screen and (max-width: 767px) {
  h1 {
    font-size: 20px;
    margin: 40px 0px 40px 0px;
  }
  .theArticle {
    width: 90%;
    & .footArt {
      justify-content: space-between;
    }
  }
  .theComments {
    width: 90%;
    & .comm {
      & .icons {
        font-size: 12px;
        & i {
          margin: 5px 5px 21px 0px;
        }
      }
      & .headComm {
        font-size: 12px;
      }
    }
  }
  button {
    width: 80%;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .formComm,
  .newDescripComm {
    width: 90%;
  }
  .formC {
    width: 80%;
    & .user {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    & h2 {
      margin: 40px 0 30px 0;
      font-size: 20px;
    }
    & textarea {
      margin: 10px 0;
    }
    & button {
      width: 180px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
  .newDescripComm {
    & .form {
      width: 80%;
      margin: auto;
      margin-top: 40px;
      & label {
        font-size: 20px;
      }
      & textarea {
        margin: 10px 0;
      }
    }
    & button {
      width: 180px;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  h1 {
    margin: 60px 0 60px 0;
  }
  .theArticle,
  .theComments,
  .formComm,
  .newDescripComm {
    width: 70%;
  }
  button {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .formC {
    width: 70%;
    & h2 {
      margin: 40px 0 30px 0;
    }
    & textarea {
      margin: 10px 0;
    }
    & button {
      width: 180px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
  .newDescripComm {
    & .form {
      width: 70%;
      & label {
        font-size: 25px;
      }
    }
  }
}
</style>