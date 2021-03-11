<template>
  <headerAll />
  <h1>Bonjour {{ pseudo }}, vous êtes sur votre profil !</h1>

  <!-- modifier profil -->
  <section id="modifier" class="modifier">
    <updateUser />
  </section>

  <!--affiche les coordonnées du profil-->
  <section class="profil" id="profil">
    {{ errorMessageGetOne }}
    <p>Adresse mail : {{ mail }}</p>
    <p>Inscrit depuis le : {{ date }}</p>
    <p>Biographie : {{ biographie }}</p>
    <p class="errorMessage">{{ errDeleteUser }}</p>
    <div class="modifSupp">
      <button @click="modifier" class="buttonMS">Modifier</button>
      <button @click="deleteUser" class="buttonMS">Supprimer</button>
    </div>
  </section>

  <!--modifier un article -->
  <section id="newDescription" class="newDescription">
    <updateItem />
  </section>

  <!-- affiche tous les article-->
  <section id="articlesPerso" class="articlesPerso">
    <h2>Tous vos articles</h2>

    <div v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>

          <div class="modifSuppItem">
            <div type="button" @click="modifierItem(mess.id)" id="buttonModif">
              <i class="far fa-edit"></i>
            </div>

            <div type="button" @click="supprimerItem(mess.id)">
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>

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

        <div class="footArt">
          <div class="like">
            <a><i class="far fa-thumbs-up" v-on:click="onLike(mess.id)"></i></a
            >{{ mess.likes }}
            <!--v-bind:style="{ color: activeColor }"-->
            <a v-on:click="onDislike(mess.id)"
              ><i class="far fa-thumbs-down"></i></a
            >{{ mess.dislikes }}
          </div>
          <a class="commAccueil" @click="viewComments(mess.id)"
            ><i class="fas fa-comment-dots"></i>
            <p class="nbcomm">{{ mess.nbComm }} Commentaires</p></a
          >
          <a class="signaler" @click="report(mess.id)"
            ><i class="far fa-flag"></i><span>Signaler ce commentaire</span></a
          >
        </div>
        {{ errorDeleteItem }}
      </article>
    </div>
  </section>

  <footerAll />
</template>

<script>
import axios from "axios";
import headerAll from "../components/headerAll";
import { DATE_FORMAT } from "../service/utility";
import { SEARCH_PICTURE } from "../service/utility";
import updateItem from "../components/updateDescription";
import footerAll from "../components/footerAll";
import updateUser from "../components/updateUser.vue";
export default {
  name: "Profil",
  components: { headerAll, updateItem, updateUser, footerAll },
  methods: {
    onLike: function (messId) {
      this.dislike = -2;
      this.like = 1;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.mail,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    onDislike: function (messId) {
      this.like = -1;
      this.dislike = 2;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.mail,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          /* let msg = JSON.stringify(response)
            if(msg.includes("200")){
              window.location.href="http://localhost:8080/item"
            }*/
        })
        .catch((error) => console.log(error));
    },
    modifier: function () {
      let myDescription = document.getElementById("profil");
      let modify = document.getElementById("modifier");
      myDescription.style.display = "none";
      modify.style.display = "flex";
    },
    deleteUser: function () {
      if (confirm("Confirmez la suppression de votre profil")) {
        let profil = JSON.parse(localStorage.getItem("userProfil"));
        let userId = profil.userId;
        let user = JSON.parse(localStorage.getItem("user"));
        axios
          .delete("http://localhost:3000/api/auth/" + userId, {
            headers: {
              authorization: "Bearer " + user.token,
            },
          })
          .then((response) => {
            let message = JSON.parse(JSON.stringify(response));
            alert(message.data.message);
            window.location.href = "http://localhost:8080/";
            localStorage.clear();
          })
          .catch((error) => {
            this.errDeleteUser =
              "Erreur lors de la suppression. Veuillez réessayer !";
            console.log(error);
          });
      }
    },
    viewComments: function (messId) {
      localStorage.setItem("commentOneItem", messId);
      window.location.href = "http://localhost:8080/comment";
    },
    modifierItem: function (messId) {
      localStorage.setItem("UpdateOneItem", messId);
      let myArticles = document.getElementById("articlesPerso");
      let myForm = document.getElementById("newDescription");
      myArticles.style.display = "none";
      myForm.style.display = "flex";
    },
    supprimerItem: function (messId) {
      if (confirm("Confirmez la suppression de votre article")) {
        let myIdItem = messId;
        console.log(myIdItem);
        let user = JSON.parse(localStorage.getItem("user"));
        axios
          .delete("http://localhost:3000/api/items/" + myIdItem, {
            headers: {
              authorization: "Bearer " + user.token,
            },
          })
          .then((response) => {
            console.log(response.data);
            window.location.href = "http://localhost:8080/items/profil/";
          })
          .catch((error) => {
            this.errorDeleteItem =
              "Une erreur s'est produite lors de la suppression. Merci de réessayer plus tard !";
            console.log(error);
          });
      }
    },
    report: function (messId) {
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
      errDeleteUser: "",
      errorDeleteItem: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.userId;

    let oneProfil = JSON.parse(localStorage.getItem("userProfil"));
    this.pseudo = oneProfil.pseudo;
    this.mail = oneProfil.email;
    this.date = DATE_FORMAT(oneProfil.creationDate);

    if (oneProfil.biographie == null || oneProfil.biographie == "") {
      this.biographie = "Modifier votre profil pour ajouter une biographie";
    } else {
      this.biographie = oneProfil.biographie;
    }

    axios
      .get("http://localhost:3000/api/items/profil/" + userId, {
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

        //croix sur module pour modifier le profil
        let myDiv = document.getElementById("modifier");
        let myCross = document.createElement("i");
        myCross.className = "fa fa-times";
        myDiv.appendChild(myCross);
        myCross.addEventListener("click", () => {
          let myDescription = document.getElementById("profil");
          let modify = document.getElementById("modifier");
          modify.style.display = "none";
          myDescription.style.display = "block";
        });

        let myDiv2 = document.getElementById("newDescription");
        let myCross2 = document.createElement("i");
        myCross2.className = "fa fa-times";
        myDiv2.appendChild(myCross2);
        myCross2.addEventListener("click", () => {
          let myDescription = document.getElementById("articlesPerso");
          let modify = document.getElementById("newDescription");
          modify.style.display = "none";
          myDescription.style.display = "block";
        });
      })
      .catch((error) => {
        this.errorMessageGetOne =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
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
  & h2 {
    font-size: 25px;
    width: 100%;
  }
  & .article {
    border: 1px solid #d2d2d2c7;
    border-radius: 5px;
    background-color: #dae0e6;
    margin: 20px;
    margin-bottom: 10px;
    & .headArt {
      border-bottom: 1px solid #b6b3b39d;
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
    & .modifSupp {
      display: flex;
      margin-top: 20px;
    }
  }
  .newDescription {
    width: 85%;
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