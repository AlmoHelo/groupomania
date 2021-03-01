<template>
  <main>
    <h1 class="id">Inscrivez-vous</h1>
    <form method="POST" @submit.prevent="envoie">
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
      <button type="submit">S'inscrire</button>
    </form>
  </main>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
import axios from "axios";
export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      password2: "",
      biographie: "",
    };
  },
  methods: {
    envoie: function () {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      if (this.password != this.password2) {
        alert("Veuillez mettre des mots de passe identiques");
      } else {
        if (this.email == "" || this.password == "" || this.pseudo == "") {
          alert(
            "Veuillez remplir tous les champs avant d'envoyer le formulaire !"
          );
        } else {
          axios
            .post(
              "http://localhost:3000/api/auth/signup",
              {
                email: this.email,
                password: this.password,
                pseudo: this.pseudo,
                biographie: this.biographie,
              },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer` + token, //Renvoi du token par l'api en cas d'authentification
                },
              }
            )
            .then((response) => {
              console.log("Inscription réussi !");
              let reponse = response.data;
              console.log(response);
              let userObject = JSON.stringify(reponse);
              localStorage.setItem("user", userObject);

              let user = JSON.parse(localStorage.getItem("user"));
              token = user.token; //Token d'authentification
              alert(
                "Félicitation vous êtes désormais inscrit ! Vous pouvez vous connecter !"
              );
              window.location.href = "http://localhost:8080/login";
            })
            .catch((err) => {
              console.log("la connexion a échouée" + err); //En cas d'echec envoie de l'information à l'utilisateur
            });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  color: white;
}
main {
  width: 50%;
  margin: auto;
  margin-top: 50px;
  & h1 {
    width: 80%;
    margin: auto;
  }
}
form {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  & label {
    margin-bottom: 15px;
    margin-top: 10px;
    text-align: start;
  }
  & input {
    border: none;
    border-radius: 8px;
    background-color: rgb(119, 114, 114);
    width: 500px;
    height: 30px;
    margin-left: 20px;
    margin-bottom: 10px;
    &::placeholder {
      font-size: 15px;
      color: rgb(39, 38, 38);
    }
  }
}
button,
.bouton {
  width: 300px;
  margin: auto;
  align-items: center;
  margin-bottom: 30px;
}
.nouveau,
.champ {
  font-size: 13px;
  width: 140px;
  margin: auto;
  margin-bottom: 20px;
}
.nouveau {
  width: 120px;
}
.bouton2 {
  text-decoration: underline;
}
textarea {
  width: 500px;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: rgb(119, 114, 114);
  border-radius: 8px;
  border: none;
}
@media screen and (max-width: 767px) {
  main {
    width: 90%;
    margin-top: 30px;
    & h1 {
      font-size: 30px;
    }
  }
  form {
    width: 90%;
    & label {
      font-size: 18px;
    }
    & input {
      width: 80%;
      height: 20px;
      border-radius: 5px;
      &::placeholder {
        font-size: 12px;
      }
    }
  }
  button,
  .bouton {
    width: 90%;
  }
  .nouveau,
  .champ {
    margin-bottom: 30px;
  }
  textarea {
    width: 80%;
    height: 35px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  main {
    width: 90%;
    & h1 {
      font-size: 45px;
    }
  }
  form {
    width: 90%;
    & label {
      font-size: 25px;
    }
    & input {
      width: 90%;
    }
  }
}
</style>