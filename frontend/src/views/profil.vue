<template>
  <headerAll />
  <h1>Bonjour {{ pseudo }}, vous êtes sur votre profil !</h1>

  <section id="modifier">
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
      <button @click="modifier">Modifier</button>
      <button @click="deleteUser">Supprimer</button>
    </div>
  </section>

<!--modifier un article -->
  <section id="newDescription">
    <updateItem />
  </section>

<!-- affiche tous les article-->
  <section id="articlesPerso">
    <h2>Tous vos articles</h2>

    <div v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>

        <p class="texte" id="texte">{{ mess.description }}</p>

        <div class="modifSuppItem">
          <button @click="modifierItem(mess.id)" id="buttonModif">
            <i class="far fa-edit"></i>Modifier
          </button>

          <button @click="supprimerItem(mess.id)">
            <i class="fas fa-trash-alt"></i> Supprimer
          </button>
          {{ errorDeleteItem }}
        </div>
      </article>
    </div>
  </section>

  <footerAll />
</template>

<script>
import axios from "axios";
import headerAll from "../components/headerAll";
import { DATE_FORMAT } from "../service/utility";
import updateItem from "../components/updateDescription";
import footerAll from "../components/footerAll";
import updateUser from "../components/updateUser.vue";
export default {
  name: "Profil",
  components: { headerAll, updateItem, updateUser, footerAll },
  methods: {
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
              authorization: "Bearer " + user.reponse.token,
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
              authorization: "Bearer " + user.reponse.token,
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
    let userId = user.reponse.userId;

    let oneProfil = JSON.parse(localStorage.getItem("userProfil"));
    this.pseudo = oneProfil.pseudo;
    this.mail = oneProfil.email;
    this.date = DATE_FORMAT(oneProfil.creationDate);
    if (oneProfil.biographie != null || oneProfil.biographie != "") {
      this.biographie = oneProfil.biographie;
    } else {
      this.biographie = "Modifier votre profil pour ajouter une biographie";
    }
    axios
      .get("http://localhost:3000/api/items/" + userId, {
        headers: {
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((response) => {
        console.log(response)
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
#modifier,
#newDescription {
  box-shadow: 1px 1px 0px white;
  width: 70%;
  margin: auto;
  margin-bottom: 50px;
}
#newDescription,
#modifier {
  display: none;
  padding: 15px;
  justify-content: space-between;
}
#articlesPerso {
  padding: 10px;
  width: 70%;
  margin: auto;
  & h2 {
    font-size: 25px;
    width: 100%;
  }
  & .headArt {
    border-bottom: 1px solid white;
  }
  & .texte {
    padding: 20px;
  }
  & .footArt {
    border-top: 1px solid white;
    padding: 10px;
  }
  & .headArt {
    display: flex;
    justify-content: space-around;
  }
  & .modifSuppItem {
    & button {
      color: white;
    }
  }
  & i {
    margin-right: 5px;
    margin-left: 5px;
  }
}
.article {
  margin-bottom: 25px;
}
button {
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
  #modifier {
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
  #articlesPerso {
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
}
</style>