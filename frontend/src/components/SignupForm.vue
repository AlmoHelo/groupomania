<template>
  <main>
    <h1 class="id">Inscrivez-vous</h1>

    <div class="box">
      <span class="bord"></span>
      <span class="bord"></span>
      <span class="bord"></span>
      <span class="bord"></span>
    </div>

    <div class="content">
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
          placeholder="*******  (min 8 caractères, 1 lettre majuscule et minuscule et 1 chiffre obligatoire)"
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
          placeholder="*******"
          required
        />
        <p class="errorMsg">{{ errPassword }}</p>
        <label for="pseudo" maxlength="8"
          >Nom d'utilisateur<span>*</span> :</label
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

        <label>Image de profil:</label
        ><input
          type="file"
          name="fichier"
          id="choosePicture"
          class="choosePicture"
          v-on:change="sendFile($event)"
        />

        <p class="champ">* : Champs obligatoires</p>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
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
      image: "",
    };
  },
  methods: {
    envoie: function () {
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
      } else {
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
          const formData = new FormData();
          formData.append("image", this.image);
          formData.append("email", this.email);
          formData.append("pseudo", this.pseudo);
          formData.append("password", this.password);
          formData.append("biographie", this.biographie);
          axios
            .post("http://localhost:3000/api/auth/signup", formData, {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer` + token, //Renvoi du token par l'api en cas d'authentification
              },
            })
            .then((response) => {
              console.log(response.data.message);
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
    sendFile(event) {
      this.$data.image = event.target.files[0];
    },
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
//animation bordure
.box {
  position: absolute;
  width: 50%;
  height: 96%;
  top: 35%;
  left: 23%;
  overflow: hidden;
  box-sizing: border-box;
}
.content {
  position: relative;
  border: 1px solid transparent;
  text-align: center;
}
.box .bord {
  position: relative;
  width: 100%;
  height: 55%;
  display: block;
  box-sizing: border-box;
}
.box .bord:nth-child(1) {
  transform: rotate(0deg);
  right: 50%;
}
.box .bord:nth-child(2) {
  transform: rotate(90deg);
  left: 25%;
  bottom: 82.5%;
}
.box .bord:nth-child(3) {
  transform: rotate(180deg);
  bottom: 65%;
  left: 50%;
}
.box .bord:nth-child(4) {
  transform: rotate(270deg);
  bottom: 92.5%;
  right: 25%;
}
.box .bord:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #dfa9a99d;
  animation: animate 4s linear infinite;
}
@keyframes animate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
//fin animation bordure
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
.choosePicture {
  background-color: transparent;
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
    margin: auto;
    & h1 {
      font-size: 30px;
    }
  }
  .box {
    width: 90%;
    height: 94%;
    top: 21%;
    left: 3%;
  }
  .box .bord:nth-child(2) {
    width: 200%;
    left: -53%;
    bottom: 82.5%;
  }
  .box .bord:nth-child(4) {
    width: 200%;
    right: 47%;
  }
  form {
    width: 100%;
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
  .box {
    width: 90%;
    height: 116%;
    top: 38%;
    left: 2%;
  }
  .box .bord:nth-child(2) {
    left: 22.5%;
  }
  .box .bord:nth-child(4) {
    right: 22%;
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