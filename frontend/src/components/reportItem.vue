<template>
  <div class="itemRep">
      {{ noneItem }}
    <div id="articles" class="msg" v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>Signaler le : {{ mess.dateReport }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <p>{{ mess.imageURL }}</p>
        <div class="footArt">
          <div
            type="button"
            @click="annulerReport(mess.idReport)"
            id="buttonModif"
          >
            <i class="far fa-edit"></i> Annuler
          </div>

          <div type="button" @click="supprimerReport(mess.idReport)">
            <i class="fas fa-trash-alt"></i> Supprimer
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DATE_FORMAT } from "../service/utility";
export default {
  name: "reportItem",
  methods: {
    annulerReport: function (messId) {
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .delete(`http://localhost:3000/api/report/${messId}`, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/report";
        })
        .catch((error) => {
          alert("Une erreur s'est produite. Veuillez réessayer la page");
          console.log(error);
        });
    },
    supprimerReport: function (messId) {
      console.log(messId);
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .delete(`http://localhost:3000/api/report/one/${messId}`, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.href="http://localhost:8080/report"
        })
        .catch((error) => {
          alert("Une erreur s'est produite. Veuillez réessayer la page");
          console.log(error);
        });
    },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/report/item/", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        if (response.data[0] == undefined) {
          this.noneItem = "Pas d'articles signalés !"
        } else {
          this.msg = response.data.map((element) => {
            element.dateReport = DATE_FORMAT(element.dateReport);
            return element;
          });
        }
      })
      .catch((error) => {
        this.noneItem =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
      });
  },
  data() {
    return {
      message: "",
      msg: "",
      noneItem: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.itemRep {
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  background-color: white;
  width: 60%;
  padding: 10px;
  margin: auto;
}
.article {
  border: 1px solid #b6b3b39d;
  background-color: #dae0e6;
  margin: 20px;
}
</style>