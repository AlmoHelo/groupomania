<template>
  <main>
    <h1 class="id">Identifiez-vous</h1>

    <form method="POST" id="formulaire" @submit.prevent="envoie">
      <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label>
      <input
        id="email"
        type="email"
        placeholder="groupomania@gmail.com"
        v-model="email"
        required
      />

      <label for="password">Mot de passe<span>*</span> :</label>
      <input
        type="password"
        id="password"
        placeholder="*******"
        v-model="password"
        required
      />

      <div class="error-message">{{ message }}</div>

      <p class="champ">* : Champs obligatoires</p>

      <button type="submit">S'identifier</button>
    </form>

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
      message: "",
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
                Authorization: `Bearer ` + token, //Renvoie du token par l'api en cas d'authentification
              },
            }
          )
          .then((response) => {
            let reponse = response.data;
            console.log(response)
            let mail = this.email;
            let all = { reponse, mail };
            console.log("Connexion réussi !");
            let userObject = JSON.stringify(all);
            localStorage.setItem("user", userObject);
            let user = JSON.parse(localStorage.getItem("user"));
            token = user.reponse.token;
            window.location.href = "http://localhost:8080/item";
          })
          .catch((err) => {
            console.log("la connexion a échouée" + err); //En cas d'echec envoie de l'information à l'utilisateur
            this.message = "E-mail ou mot de passe incorrect !";
          });
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