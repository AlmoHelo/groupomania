<template>
  <section>
    <h2>Top 3</h2>
    <div class="allBest">
      {{ errorMessage }}
      <div class="article" v-for="mess in msg" :key="mess.idMessages">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <i class="far fa-thumbs-up" v-on:click="onLike(mess.id)"></i>
          <i class="far fa-thumbs-down" v-on:click="onDislike(mess.id)"></i>
          <i class="fas fa-comment-dots" @click="viewComments(mess.id)"></i>
          <a class="signaler"><i class="far fa-flag"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DATE_FORMAT } from "../service/utility";
import axios from "axios";
export default {
  name: "bestItem",
  data() {
    return {
      message: "",
      msg: "",
      errorMessage: "",
    };
  },
  methods: {
    onLike: function (messId) {
      this.dislike = -2;
      this.like = 1;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.reponse.userId + "/like",
          {
            userId: user.reponse.userId,
            email: user.mail,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.reponse.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    onDislike: function (messId) {
      this.like = -1;
      this.dislike = 2;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.reponse.userId + "/like",
          {
            userId: user.reponse.userId,
            email: user.mail,
            like: this.like,
            dislike: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.reponse.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          /* let msg = JSON.stringify(response)
            if(msg.includes("200")){
              window.location.href="http://localhost:8080/item"
            }*/
        })
        .catch((error) => console.log(error));
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
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((response) => {
        this.msg = response.data.map((element) => {
          element.date = DATE_FORMAT(element.date);
          return element;
        });
        let test = response.data;
        test.sort(function (a, b) {
          return a.likes - b.likes;
        });
        test.reverse();
        for (let i = 0; i < test.length && i < 3; i++) {
          let myFavoriteItem = [];
          myFavoriteItem[0] = test[0];
          myFavoriteItem[1] = test[1];
          myFavoriteItem[2] = test[2];
          localStorage.setItem("bestItem", JSON.stringify(myFavoriteItem));
        }
        this.msg = JSON.parse(localStorage.getItem("bestItem"));

        console.log(test);
      })
      .catch((error) => {
        console.log(error);
        this.errorMessage =
          "Une erreur s'est produite. Veuillez recharger la page";
      });
  },
};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid white;
  border-radius: 20px;
  width: 90%;
  max-height: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 10px;
  & h2 {
    border-bottom: 1px solid white;
    width: 100%;
    text-align: start;
    font-weight: normal;
    padding: 10px 10px;
  }
}
.article {
  border: 1px solid white;
  margin: 20px;
  & .footArt {
    justify-content: flex-end;
    & i {
      margin-right: 10px;
    }
  }
}
@media screen and (max-width: 767px) {
  section {
    width: 90%;
    max-height: 800px;
    margin-top: 0;
    & h2 {
      font-size: 15px;
    }
  }
  .article {
    margin-bottom: 20px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  section {
    width: 98%;
    margin-bottom: 50px;
    & .allBest {
      margin: 10px;
    }
    & .article {
      margin: 5px;
      margin-top: 0;
      font-size: 14px;
      & .headArt {
        max-height: 50px;
        & p {
          margin: 5px 0;
        }
      }
      & .texte {
        height: 50px;
      }
      & .footArt {
        height: 10px;
      }
    }
  }
}
</style>