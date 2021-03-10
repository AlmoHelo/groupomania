<template>
  <section>
    <div class="create">
      <router-link to="/items/create" class="creation" @click="createItem"
        >Créer un article
      </router-link>
    </div>
    {{ errorMessage }}
    <div
      id="articles"
      class="msg"
      v-for="(mess, index) in msg"
      :key="mess.idMessages"
    >
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <p>{{ mess.imageURL }}</p>
        <div class="footArt">
          <div class="like">
            <a
              ><i
                class="far fa-thumbs-up" id="good"
                v-on:click="onLike(mess.id, index)"
              ></i></a
            >{{ mess.likes }}
            <!--v-bind:style="{ color: activeColor }"-->
            <a v-on:click="onDislike(mess.id, index)"
              ><i class="far fa-thumbs-down" id="bad"></i></a
            >{{ mess.dislikes }}
          </div>
          <a class="commAccueil" @click="viewComments(mess.id)"
            ><i class="fas fa-comment-dots"></i>
            <p class="nbcomm">{{ mess.nbComm }} Commentaires</p></a
          >
          <a class="signaler"
            ><i class="far fa-flag"></i><span>Signaler ce commentaire</span></a
          >
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { DATE_FORMAT } from "../service/utility";
import { SEARCH_PICTURE } from "../service/utility";
export default {
  name: "itemAll",
  methods: {
    onLike: function (messId, indexI) {
      this.like = 1;
      this.dislike = -2;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          let good = document.getElementById("good")
          let bad = document.getElementById("bad")
          if (response.data.addLike) {
            this.msg[indexI].likes++;
            good.style.color= "green"
            this.msg[indexI].dislikes--;
            bad.style.color= "black"
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDislike: function (messId, indexI) {
      this.like = -1;
      this.dislike = 2;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          let bad = document.getElementById("bad")
          let good = document.getElementById("good")
          if (response.data.addDislike) {
            this.msg[indexI].dislikes++;
            this.msg[indexI].likes--;
            good.style.color= "black"
            bad.style.color= "red"
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    viewComments: function (messId) {
      localStorage.setItem("commentOneItem", messId);
      window.location.href = "http://localhost:8080/comment";
    },
  },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/items/", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        this.msg = response.data.map((element) => {
          if (element.imageURL != null) {
            element.imageURL = SEARCH_PICTURE(element.imageURL);
            return element;
          }
        });
        this.msg = response.data.map((element) => {
          element.date = DATE_FORMAT(element.date);
          return element;
        });
      })
      .catch((error) => {
        this.errorMessage =
          "Une erreur s'est produite. Veuillez recharger la page";
        console.log(error);
      });
  },
  data() {
    return {
      message: "",
      msg: "",
      errorMessage: "",
      //activeColor: "white",
    };
  },
};
</script>

<style lang="scss">
section {
  width: 90%;
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  margin: auto;
  margin-top: 10px;
  background-color: white;
  & .create {
    padding: 10px 0;
    & .creation {
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: black;
    }
  }
}
.article {
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  background-color: #dae0e6;
  margin: 20px;
  & .headArt {
    border-bottom: 1px solid #b6b3b39d;
  }
  & .commAccueil {
    display: flex;
    align-items: center;
    & .nbcomm {
      margin: 0;
      margin-left: 2px;
    }
  }
  & .texte {
    padding: 20px;
  }
  & .footArt {
    border-top: 1px solid #b6b3b39d;
    padding: 15px;
  }
  & .headArt,
  .footArt {
    display: flex;
    justify-content: space-around;
  }
  & i {
    margin-right: 5px;
    margin-left: 5px;
  }
}
.signaler {
  &:hover span {
    display: inline;
    white-space: nowrap;
    padding: 3px;
  }
  & span {
    display: none;
  }
}
/*.far:active {
  color: red;
}*/
@media screen and (max-width: 767px) {
  section {
    padding: 10px;
    & .create {
      & .creation {
        font-size: 15px;
      }
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
  section {
    padding: 10px;
    & .create {
      & .creation {
        font-size: 15px;
      }
    }
  }
  .article {
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    & .footArt {
      justify-content: space-between;
    }
  }
}
</style>