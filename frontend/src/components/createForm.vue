<template>
  <div>
    <h1>Créer votre article</h1>
    <form method="POST" @submit.prevent="envoie">
      <p class="pseudo">Pseudo : {{ pseudoUser }}</p>
      <label>Description*:</label
      ><textarea
        name="description"
        v-model="description"
        id="description"
        required
      />
      <label>Images:</label
      ><input
        type="file"
        name="fichier"
        id="choosePicture"
        class="choosePicture"
        v-on:change="sendFile($event)"
      />

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
      pseudoUser: "",
      description: "",
      image: "",
    };
  },
  methods: {
    envoie: function () {                         //envoie du nouvel article
      let tableau = JSON.parse(localStorage.getItem("user"));
      let token = tableau.token;

      const formData = new FormData();
      formData.append("image", this.image);
      formData.append(
        "pseudoUser",
        JSON.parse(localStorage.getItem("user")).pseudo
      );
      formData.append("description", this.description);

      console.log(formData);
      if (this.description == "") {
        alert(
          "Veuillez remplir tous les champs avant d'envoyer le formulaire !"
        );
      } else {
        axios
          .post("http://localhost:3000/api/items/create", formData, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ` + token, //Renvoie du token par l'api en cas d'authentification
            },
          })
          .then((response) => {
            console.log(response);
            window.location.href="http://localhost:8080/item/"
          })
          .catch(() => {
            console.log("l'envoi a échouée"); //En cas d'echec envoie de l'information à l'utilisateur
            //this.message = "E-mail ou mot de passe incorrect !";
          });
      }
    },
    sendFile(event) {
      this.$data.image = event.target.files[0];
    },
  },
  mounted() {
    this.pseudoUser = JSON.parse(localStorage.getItem("user")).pseudo;
    if (JSON.parse(localStorage.getItem("user")).pseudo == undefined) {
      this.pseudoUser = JSON.parse(localStorage.getItem("user")).mail;
    }
  },
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
  margin-top: 40px;
  margin-bottom: 30px;
  & label,
  .pseudo {
    margin-bottom: 15px;
    margin-top: 10px;
    text-align: start;
  }
  & input {
    border: none;
    border-radius: 8px;
    background-color: #c3c3c3;
    width: 100%;
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
  width: 100%;
  height: 80px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: #c3c3c3;
  border-radius: 8px;
  border: none;
}
.choosePicture {
  background-color: transparent;
}
button {
  margin: auto;
}
.champ {
  font-size: 13px;
  margin: auto;
  margin-bottom: 20px;
}

@media screen and (max-width: 767px) {
  div {
    width: 100%;
  }
  form {
    width: 80%;
    & input,
    textarea {
      width: 90%;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  div {
    width: 80%;
  }
  form {
    width: 80%;
    & input,
    textarea {
      width: 90%;
    }
  }
}
</style>