<template>
  <div id="descriptionForm">
    <label> Nouvelle description :</label>
    <textarea
      name="description"
      v-model="description"
      id="description"
      required
    />
    <p class="errorMessage">{{ errUpdateItem }}</p>
    <button @click="sendUpdateItem()" id="sendUpdateItem">Envoyer</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "updateItem",
  data(){
    return {
      errEmail: "",
      errPseudo: "",
      errPassword: "",
    }
  },
  methods: {
    sendUpdateItem: function () {
      let idOneItem = JSON.parse(localStorage.getItem("UpdateOneItem"));

      if (this.description == "") {
        alert(
          "Veuillez remplir tous le champs avant d'envoyer la modification !"
        );
      } else {
        let user = JSON.parse(localStorage.getItem("user"));
        axios
          .put(
            "http://localhost:3000/api/items/" + idOneItem,
            {
              description: this.description,
            },
            {
              headers: {
                authorization: "Bearer " + user.reponse.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            window.location.href = "http://localhost:8080/items/profil/";
          })
          .catch((error) => {
            this.errUpdateItem =
              "Une erreur s'est produite ! Veuillez réessayer !";
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#descriptionForm {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
}
label {
  font-size: 20px;
}
textarea {
  width: 60%;
  height: 60px;
  margin: 20px 0;
  background-color: rgb(119, 114, 114);
}
button {
  border: 1px solid #5a85b1;
  background-color: #5a85b1;
  color: white;
  font-size: 22px;
  margin-top: 20px;
}
</style>