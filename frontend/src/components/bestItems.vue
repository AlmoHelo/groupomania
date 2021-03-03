<template>
  <section>
    <h2>Top 3</h2>
    <div class="allBest">
      <div class="article" v-for="mess in msg" :key="mess.idMessages">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <i class="far fa-thumbs-up" v-on:click="onLike(mess.id)"></i>
          <i class="far fa-thumbs-down" v-on:click="onDislike(mess.id)"></i>
          <i class="fas fa-comment-dots"></i>
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
    };
  },
  methods: {
    onLike: function (messId) {
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
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.reponse.token,
            },
          }
        )
        .then((test) => {
          console.log("mon test est " + test);
        })
        .catch((error) => console.log(error));
    },
    onDislike: function (messId) {
      this.dislike = -1;
      let idOneItem = messId;
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.reponse.userId + "/like",
          {
            userId: user.reponse.userId,
            email: user.mail,
            like: this.dislike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.reponse.token,
            },
          }
        )
        .then((test) => {
          console.log("mon test est " + test);
        })
        .catch((error) => console.log(error));
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
        test.sort(test.likes);
        console.log(test);
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid white;
  border-radius: 20px;
  width: 30%;
  max-height: 710px;
  margin-top: 80px;
  overflow: hidden;
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
  margin-bottom: 0;
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
      display: flex;
      margin: 10px;
    }
    & .article {
      width: 33%;
      margin: 5px;
      margin-top: 0;
      font-size: 14px;
      & .headArt {
        flex-direction: column;
        justify-content: flex-start;
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