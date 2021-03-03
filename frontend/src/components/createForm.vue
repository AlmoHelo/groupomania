<template>
  <div>
    <h1>Créer votre article</h1>
    <form method="POST" @submit.prevent="envoie">
      <p>Pseudo : {{ pseudoUser}} </p>
      <label>Description*:</label
      ><textarea
        name="description"
        v-model="description"
        id="description"
        required
      />
      <label>Images:</label><input />

      <p class="champ">* : Champs obligatoires</p>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "createForm",
  data() {
    return {
      pseudoUser: JSON.parse(localStorage.getItem("user")).reponse.pseudo,
      description: "",
    };
  },
  methods: {
    envoie: function () {
      let tableau =localStorage.getItem("user");
      let tab = JSON.parse(tableau)
      let token = tab.reponse.token
      if (this.description == "") {
        alert(
          "Veuillez remplir tous les champs avant d'envoyer le formulaire !"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/items/create",
            {
              pseudoUser: JSON.parse(localStorage.getItem("user")).reponse.pseudo,
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
            console.log(response)
            window.location.href="http://localhost:8080/item/"
          })
          .catch(() => {
            console.log("l'envoi a échouée"); //En cas d'echec envoie de l'information à l'utilisateur
            //this.message = "E-mail ou mot de passe incorrect !";
          });
      }
    },
  },
  mounted(){
    console.log(JSON.parse(localStorage.getItem("user")).reponse.pseudo)
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 50%;
  margin: auto;
  margin-top: 80px;
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
textarea {
  width: 500px;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: rgb(119, 114, 114);
  border-radius: 8px;
  border: none;
}
button {
  margin: auto;
}
.champ {
  font-size: 13px;
  margin: auto;
  margin-bottom: 20px;
}
</style>