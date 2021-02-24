<template>
  <main id="formLog">
    <h2 class="id">Identifiez-vous</h2>
    <form method="POST" id="formulaireLog" @submit.prevent="envoie">
      <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label>
      <input
        id="emailLog"
        type="email"
        placeholder="groupomania@gmail.com"
        v-model="emailLog"
        required
      />
      <label for="passwordLog">Mot de passe<span>*</span> :</label>
      <input
        type="password"
        id="password"
        placeholder="*******"
        v-model="passwordLog"
        required
      />
      <div class="error-message">{{ message }}</div>
      <p class="champ">* : Champs obligatoires</p>
      <router-link to="/accueil" class="bouton" type="submit"
        >S'identifier</router-link
      ><small id="smallpass" class="text-danger"></small>
    </form>
    <p class="nouveau">
      Nouveau ?
      <button @click="signupPage2()" to="/signup" id="signupPage2">
        S'inscrire
      </button>
    </p>
  </main>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  el: "#logPage",
  data() {
    return {
      emailLog: "",
      passwordLog: "",
      message: "",
    };
  },
  methods: {
    envoie: function () {
      //let myEmail = document.getElementById("emailLog").value;
      //let myPassword = document.getElementById("passwordLog").value;
      let token = "";
      if (this.emailLog == "" || this.passwordLog == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/login",
            { email: this.emailLog, password: this.passwordLog },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}`,
              },
            }
          )
          .then((response) => {
            let rep = response.data;
            console.log("Connexion réussie !");
            let userObj = JSON.stringify(rep);
            this.$localStorage.setItem("user", userObj);
            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.email == this.emailLog) {
              window.location.href = "http://localhost:8080/accueil";
              location.reload(true);
            } else {
              alert("Utilisateur non trouvé !");
            }
          })
          .catch(() => {
            console.log("La connexion a échouée !");
            alert("Pseudo ou mot de passe incorrect");
            document.querySelector("#smallpass").innerHTML =
              "pseudo ou mot de  passe incorrect";
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
  }
  & input {
    border: none;
    border-radius: 8px;
    background-color: rgb(88, 84, 84);
    width: 500px;
    height: 30px;
    margin-left: 20px;
    &::placeholder {
      font-size: 15px;
      color: rgb(153, 150, 150);
    }
  }
}
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
</style>