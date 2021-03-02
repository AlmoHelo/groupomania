<template>
  <headerAll />
  <h1>Bonjour {{ pseudo }}, vous êtes sur votre profil !</h1>
  <section id="modifier">
    <div class="headModif" id="headModif">
      <h2>Modifier votre profil</h2>
    </div>
    <form method="Put" @submit.prevent="sendUpdate">
      <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label
      ><input
        id="email"
        type="email"
        v-model="email"
        placeholder="groupomania@gmail.com"
      />
      <label for="password" maxlength="8">Mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe"
        v-model="password"
        placeholder="*******  (max 8 caractères)"
      />
      <label for="password2" maxlength="8"
        >Confirmation mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe2"
        v-model="password2"
        placeholder="*******  (max 8 caractères)"
      />
      <label for="pseudo" maxlength="8">Nom d'utilisateur<span>*</span> :</label
      ><input
        type="name"
        name="name"
        id="pseudo"
        v-model="pseudo"
        placeholder="Groupo  (max 8 caractères)"
      />
      <label for="Biographie">Biographie :</label
      ><textarea name="biographie" v-model="biographie" id="biographie" />
      <p class="champ">* : Champs obligatoires</p>
      <button type="submit">Modifier</button>
    </form>
  </section>
  <section class="profil" id="profil">
    <p>Adresse mail : {{ mail }}</p>
    <p>Inscrit depuis le : {{ date }}</p>
    <p>Biographie : {{ biographie }}</p>
    <div>
      <button @click="modifier">Modifier</button>
      <button @click="supprimer">Supprimer</button>
    </div>
  </section>
  <section id="articlesPerso">
    <h2>Tous vos articles</h2>
    <div v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <div class="like">
            <a><i class="far fa-thumbs-up"></i></a>{{ mess.likes }}
            <a><i class="far fa-thumbs-down"></i></a>{{ mess.dislikes }}
          </div>
          <div><i class="fas fa-comment-dots"></i>Commentaires</div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import headerAll from "../components/headerAll";
export default {
  name: "Profil",
  components: { headerAll },
  methods: {
    modifier: function () {
      let myDescription = document.getElementById("profil");
      let modify = document.getElementById("modifier");
      myDescription.style.display = "none";
      modify.style.display = "block";
    },
    sendUpdate: function () {
      let profil = JSON.parse(localStorage.getItem("userProfil"));
      let userId = profil.userId;
      let user = JSON.parse(localStorage.getItem("user"));
      if (this.password != this.password2) {
        alert("Veuillez mettre des mots de passe identiques");
      } else {
        if (this.email == "" || this.password == "" || this.pseudo == "") {
          alert(
            "Veuillez remplir tous les champs avant d'envoyer le formulaire !"
          );
        } else {
          axios
            .put(
              "http://localhost:3000/api/auth/" + userId,
              {
                id: profil.userId,
                email: this.email,
                password: this.password,
                pseudo: this.pseudo,
                biographie: this.biographie,
              },
              {
                headers: {
                  authorization: "Bearer " + user.reponse.token,
                },
              }
            )
            .then((response) => {
              alert(response.data.message);
              window.location.href = "http://localhost:8080/items/profil/";
            })
            .catch((error) => console.log(error));
        }
      }
    },
    supprimer: function () {
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
        .catch((error) => console.log(error));
    },
  },
  data() {
    return {
      pseudo: "",
      password: "",
      mail: "",
      date: "",
      biographie: "",
      data: JSON.parse(localStorage.getItem("articlesProfil")),
      message: "",
      msg: "",
    };
  },
  mounted() {
    let profil = JSON.parse(localStorage.getItem("userProfil"));
    this.pseudo = profil.pseudo;
    this.mail = profil.email;
    this.date = profil.creationDate;
    if (profil.biographie != null || profil.biographie != "") {
      this.biographie = profil.biographie;
    } else {
      this.biographie = "Modifier votre profil pour ajouter une biographie";
    }
    let userId = profil.userId;
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/items/" + userId, {
        headers: {
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((response) => {
        localStorage.setItem("articlesProfil", JSON.stringify(response.data));
        this.msg = response.data;

        let myDiv = document.getElementById("headModif");
        let myCross = document.createElement("i");
        myCross.className = "fa fa-times";
        myDiv.appendChild(myCross);
        myCross.addEventListener("click", () => {
          let myDescription = document.getElementById("profil");
          let modify = document.getElementById("modifier");
          modify.style.display = "none";
          myDescription.style.display = "block";
        });
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.profil,
#modifier {
  box-shadow: 1px 1px 0px white;
  width: 70%;
  margin: auto;
  margin-bottom: 50px;
}
#modifier {
  display: none;
  padding: 20px;
  & .headModif {
    display: flex;
  }
  & form {
    display: flex;
    flex-direction: column;
    & label {
      margin-top: 20px;
    }
    & input,
    textarea {
      background-color: rgb(119, 114, 114);
      width: 70%;
      height: 30px;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 10px;
      border: none;
      &::placeholder {
        font-size: 15px;
        color: rgb(39, 38, 38);
      }
    }
  }
  & button {
    border: 1px solid #5a85b1;
    background-color: #5a85b1;
    color: white;
    font-size: 22px;
    margin: auto;
    margin-top: 20px;
  }
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
.article {
  margin-bottom: 25px;
}
button {
  font-size: 15px;
  border: none;
  background: none;
  color: rgb(209, 63, 63);
}
</style>