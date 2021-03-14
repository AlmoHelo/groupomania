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
          <p class="profilArt">
            <img
              v-bind:src="mess.pictureProfil"
              class="myImgProfil"
              v-if="mess.pictureProfil != null"
            />{{ mess.pseudoUser }}
          </p>
          <p class="dateArt">{{ mess.date }}</p>
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
          <div class="like">
            <a
              ><i
                class="far fa-thumbs-up"
                id="good"
                v-on:click="onLike(mess.id, index)"
              ></i></a
            >{{ mess.likes }}
            <a v-on:click="onDislike(mess.id, index)"
              ><i class="far fa-thumbs-down" id="bad"></i></a
            >{{ mess.dislikes }}
          </div>
          <a class="commAccueil" @click="viewComments(mess.id)"
            ><i class="fas fa-comment-dots"></i>
            <p class="nbcomm">{{ mess.nbComm }} Commentaires</p></a
          >
          <a class="signaler" @click="report(mess.id)"
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
          if (response.data.addLike) {
            this.msg[indexI].likes++;
            this.msg[indexI].dislikes--;
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
          if (response.data.addDislike) {
            this.msg[indexI].dislikes++;
            this.msg[indexI].likes--;
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
    report: function (messId) {
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          `http://localhost:3000/api/report/`,
          { itemId: messId, userId: user.userId },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
.descrip {
  display: flex;
  align-items: center;
  & .myLinkPict {
    margin: 10px 0px 10px 10%;
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
.article {
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  background-color: #dae0e6;
  margin: 20px;
  & .headArt {
    align-items: center;
    border-bottom: 1px solid #b6b3b39d;
    & .profilArt {
      display: flex;
      align-items: center;
      & .myImgProfil {
        max-width: 80px;
        max-height: 80px;
        margin-right: 20px;
        border-radius: 40px;
      }
    }
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
@media screen and (max-width: 767px) {
  section {
    padding: 10px;
    & .create {
      & .creation {
        font-size: 15px;
      }
    }
  }
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
    & .headArt {
      & .profilArt {
        & .myImgProfil {
          max-width: 40px;
          max-height: 40px;
          margin-right: 10px;
        }
      }
      & .dateArt {
        width: 30%;
      }
    }
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
  .article {
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    font-size: 14px;
    & .headArt {
      & .profilArt {
        & .myImgProfil {
          max-width: 50px;
          max-height: 50px;
          margin-right: 10px;
        }
      }
      & .dateArt {
        width: 40%;
      }
    }
    & .footArt {
      justify-content: space-between;
    }
  }
}
</style>