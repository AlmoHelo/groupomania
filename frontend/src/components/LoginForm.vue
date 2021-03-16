<template>
  <main>
    <h1 class="id">Identifiez-vous</h1>

    <!-- animation bordures -->
    <div class="box">
      <span class="bord"></span>
      <span class="bord"></span>
      <span class="bord"></span>
      <span class="bord"></span>
    </div>

    <div class="content">
      <form method="POST" id="formulaire" @submit.prevent="envoie">
        <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label>
        <input
          id="email"
          placeholder="groupomania@gmail.com"
          v-model="email"
          required
        />
        <p class="errorMsg">{{ errEmail }}</p>

        <label for="password">Mot de passe<span>*</span> :</label>
        <input
          type="password"
          id="password"
          placeholder="*******"
          v-model="password"
          required
        />
        <p class="errorMsg">{{ errPassword }}</p>

        <p class="champ">* : Champs obligatoires</p>

        <button type="submit">S'identifier</button>
      </form>
    </div>

    <p class="nouveau">
      Nouveau ?
      <router-link to="/signup" class="bouton2">S'inscrire </router-link>
    </p>
  </main>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
import axios from "axios";
export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: "",
      errEmail: "",
      errPassword: "",
    };
  },
  methods: {
    envoie: function () {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      if (this.email == "" || this.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/login",
            {
              email: this.email,
              password: this.password,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ` + token, 
              },
            }
          )
          .then((response) => {
            let reponse = JSON.stringify(response.data);
            //stockage des informations dans le localStorage pour pouvoir les réutiliser
            localStorage.setItem("user", reponse);
            let user = JSON.parse(localStorage.getItem("user"));
            token = user.token;
            window.location.href = "http://localhost:8080/item";
          })
          .catch((err) => {
            let msgErr = JSON.stringify(err);
            if (msgErr.includes("500")) {                   //si erreur sur email ou pseudo
              this.errEmail = "E-mail ou pseudo inconnu !";
              this.errPassword = "";
              let myEmail = document.getElementById("email");
              myEmail.style.border = "1px solid red";
              myEmail.animate(
                [
                  { transform: "translateX(10px)" },
                  { transform: "translateX(-10px)" },
                ],
                { duration: 60, iterations: 4, easing: "ease-in-out" }
              );
            } else if (msgErr.includes("401")) {        //si erreur sur le mot de passe
              this.errPassword = "Mot de passe incorrect !";
              this.errEmail = "";
              let myPassword = document.getElementById("password");
              myPassword.style.border = "1px solid red";
              myPassword.animate(
                [
                  { transform: "translateX(10px)" },
                  { transform: "translateX(-10px)" },
                ],
                { duration: 60, iterations: 4, easing: "ease-in-out" }
              );
            }
            console.log("la connexion a échouée" + err); //En cas d'echec envoie de l'information à l'utilisateur
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//animation bordure
.box {
  position: absolute;
  width: 50%;
  height: 40%;
  top: 39%;
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
  left: 39.5%;
  bottom: 83%;
}
.box .bord:nth-child(3) {
  transform: rotate(180deg);
  bottom: 65%;
  left: 50%;
}
.box .bord:nth-child(4) {
  transform: rotate(270deg);
  bottom: 92%;
  right: 39.5%;
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
.errorMsg {
  color: rgb(124, 51, 51);
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  margin-left: 20px;
  text-align: start;
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
    background-color: #c3c3c3;
    width: 500px;
    height: 30px;
    margin-left: 20px;
    margin-bottom: 25px;
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
  .box {
    width: 90%;
    height: 42%;
    top: 27%;
  }
  .box .bord:nth-child(2) {
    left: 26%;
  }
  .box .bord:nth-child(4) {
    right: 26%;
  }
  form {
    width: 90%;
    & label {
      font-size: 18px;
    }
    & input {
      width: 80%;
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
    height: 250px;
    top: 49%;
  }
  .box .bord:nth-child(2) {
    transform: rotate(90deg);
    left: 40%;
    bottom: 83%;
  }
  .box .bord:nth-child(3) {
    transform: rotate(180deg);
    bottom: 65%;
    left: 50%;
  }
  .box .bord:nth-child(4) {
    transform: rotate(270deg);
    bottom: 92%;
    right: 40%;
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