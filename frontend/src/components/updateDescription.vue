<template>
  <div id="descriptionForm" class="descriptionForm">
    <label class="title"> Nouvelle description :</label>
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
                authorization: "Bearer " + user.token,
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
.descriptionForm {
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
    background-color: #c3c3c3;
    width: 60%;
    height: 70px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: none;
}
button {
  margin: auto;
  margin-top: 20px;
}

@media screen and (max-width: 767px) {
  .descriptionForm{
    padding: 5px;
  }
  label{
    margin-top: 20px;
    margin-bottom: 20px;
  }
   textarea {
      width: 90%;
      border-radius: 5px;
      margin-bottom: 0;
   }
}
@media (min-width: 768px) and (max-width: 991px) {
  textarea{
    margin-bottom: 0;
  }
}
</style>