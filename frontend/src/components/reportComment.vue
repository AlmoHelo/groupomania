<template>
  <div id="articles" class="msg" v-for="mess in msg" :key="mess.idMessages">
    <article class="article">
      <div class="headArt">
        <p>{{ mess.pseudoUserComm }}</p>
        <p>Signaler le : {{ mess.dateReport }}</p>
      </div>
      <p class="texte">{{ mess.descriptionComm }}</p>
      <p>{{ mess.imageURL }}</p>
      <div class="footArt">
        <div type="button" @click="annulerReport(mess.id)" id="buttonModif">
          <i class="far fa-edit"></i> Annuler
        </div>

        <div type="button" @click="supprimerReport(mess.id)">
          <i class="fas fa-trash-alt"></i> Supprimer
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { DATE_FORMAT } from "../service/utility";
export default {
  name: "reportItem",
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/report/comment/", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.msg = response.data.map((element) => {
          element.dateReport = DATE_FORMAT(element.dateReport);
          return element;
        });
      })
      .catch((error) => {
        this.errorMessageGetOne =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
      });
  },
  data() {
    return {
      message: "",
      msg: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.article {
  border: 1px solid #b6b3b39d;
  background-color: #dae0e6;
  margin: auto;
  margin-bottom: 20px;
  width: 60%;
}
</style>