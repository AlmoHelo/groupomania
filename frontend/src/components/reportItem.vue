<template>
  <div class="itemRep">
    {{ noneItem }}
    <div id="articles" class="msg" v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>Signaler le : {{ mess.dateReport }}</p>
        </div>
        <div class="descrip">
          <a
            v-bind:href="'http://localhost:3000/images/' + mess.imageURL"
            class="myLinkPict"
            ><img
              v-bind:src="'http://localhost:3000/images/' + mess.imageURL"
              class="myImg"
              title="Cliquer pour agrandir"
              v-if="mess.imageURL != null"
          /></a>
          <p class="texte" id="texte">{{ mess.description }}</p>
        </div>
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
import { SEARCH_PICTURE } from "../service/utility";
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
          window.location.href = "http://localhost:8080/report";
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
          this.noneItem = "Pas d'articles signalés !";
        } else {
          this.msg = response.data.map((element) => {
            if (element.imageURL != null) {
              element.imageURL = SEARCH_PICTURE(element.imageURL);
              return element;
            }
          });
          this.msg = response.data.map((element) => {
            element.dateReport = DATE_FORMAT(element.dateReport);
            return element;
          });
        }
      })
      .catch((error) => {
        this.noneItem = "Une erreur s'est produite. Veuillez recharger la page";
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
.descrip {
  display: flex;
  align-items: center;
  & .myLinkPict {
    margin: 10px 0px 10px 40px;
    max-width: 40%;
  }
  & .myImg {
    border-radius: 5px;
    max-width: 100%;
    max-height: 150px;
  }
  & .texte {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 767px) {
  .descrip {
    flex-direction: column;
    & .myLinkPict {
      margin: auto;
      margin-top: 10px;
      max-width: 100%;
    }
    & .myImg {
      max-height: 20%;
    }
    & .texte {
      margin-top: 0px;
      margin-bottom: 10px;
    }
  }
  .article {
    font-size: 12px;
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    & .footArt {
      justify-content: space-between;
      padding: 10px;
    }
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .descrip {
    & .myLinkPict {
      margin: auto;
      margin: 5px;
      max-width: 50%;
      & .myImg {
        max-height: 220px;
      }
    }
  }
}
</style>