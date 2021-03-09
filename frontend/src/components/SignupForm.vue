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
        required
      />
      <p class="errorMsg">{{ errEmail }}</p>
      <label for="password" maxlength="8">Mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe"
        v-model="password"
        placeholder="*******  (max 8 caractères)"
        required
      />
      <p class="errorMsg">{{ errPasswordReg }}</p>
      <label for="password2" maxlength="8"
        >Confirmation mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe2"
        v-model="password2"
        placeholder="*******  (max 8 caractères)"
        required
      />
      <p class="errorMsg">{{ errPassword }}</p>
      <label for="pseudo" maxlength="8">Nom d'utilisateur<span>*</span> :</label
      ><input
        type="name"
        name="name"
        id="pseudo"
        v-model="pseudo"
        placeholder="Groupo  (max 8 caractères)"
        required
      />
      <p class="errorMsg">{{ errPseudo }}</p>
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
      errEmail: "",
      errPseudo: "",
      errPassword: "",
      errPasswordReg: "",
    };
  },
  methods: {
    envoie: function () {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      const lowcaseReg = /[a-z]+/;
      const uppercaseReg = /[A-Z]+/;
      const minCharactersReg = /.{8,}/;
      const numberReg = /[0-9]+/;

      const myPassword = this.password;
      if (
        myPassword.match(lowcaseReg) == null ||
        myPassword.match(uppercaseReg) == null ||
        myPassword.match(minCharactersReg) == null ||
        myPassword.match(numberReg) == null
      ) {
        this.errPasswordReg =
          "Votre mot de passe doit contenir au moins une minuscule, une majuscule et un nombre. Il doit avoir au minimum 8 caractères !";
        console.log("ok");
      } else {
        console.log("pasOk");
        if (this.password != this.password2) {
          this.errPassword = "Veuillez mettre des mots de passe identiques";
          this.errPasswordReg = "";
          this.errEmail = "";
          this.errPseudo = "";
          let myPassword = document.getElementById("Mot de passe2");
          myPassword.style.border = "1px solid red";
          myPassword.animate(
            [
              { transform: "translateX(10px)" },
              { transform: "translateX(-10px)" },
            ],
            { duration: 60, iterations: 4, easing: "ease-in-out" }
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
              window.location.href = "http://localhost:8080/login";
            })
            .catch((error) => {
              let msgErr = JSON.stringify(error);
              if (msgErr.includes("410")) {
                this.errEmail = "E-mail déjà utilisé !!";
                this.errPassword = "";
                this.errPseudo = "";
                let myEmail = document.getElementById("email");
                myEmail.style.border = "1px solid red";
                myEmail.animate(
                  [
                    { transform: "translateX(10px)" },
                    { transform: "translateX(-10px)" },
                  ],
                  { duration: 60, iterations: 4, easing: "ease-in-out" }
                );
              } else if (msgErr.includes("420")) {
                this.errPseudo = "Pseudo déjà utilisé !";
                this.errEmail = "";
                this.errPassword = "";
                let myPseudo = document.getElementById("pseudo");
                myPseudo.style.border = "1px solid red";
                myPseudo.animate(
                  [
                    { transform: "translateX(10px)" },
                    { transform: "translateX(-10px)" },
                  ],
                  { duration: 60, iterations: 4, easing: "ease-in-out" }
                );
              }
              console.log("la connexion a échouée" + error); //En cas d'echec envoie de l'information à l'utilisateur
            });
        }
      }
    },

    /*for (let condition of this.rules) {
        let errors = [];
        if (!condition.regex.test(this.password)) {
          errors.push(condition.message);
        }
        if (errors.length === 0) {
          return { valid: true, errors };
        } else {
          this.errPassword = errors;
        }*/
  },
};
</script>
<style lang="scss" scoped>
.errorMsg {
  color: rgb(124, 51, 51);
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  margin-left: 20px;
  text-align: start;
}
h1 {
  width: 80%;
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  width: 50%;
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
    background-color: #c3c3c3;
    width: 90%;
    height: 30px;
    margin-left: 20px;
    margin-bottom: 10px;
    &::placeholder {
      font-size: 15px;
      color: rgb(39, 38, 38);
    }
  }
}
textarea {
  width: 90%;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: #c3c3c3;
  border-radius: 8px;
  border: none;
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