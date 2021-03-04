<template>
  <section>
    <div class="create">
      <router-link to="/items/create" class="creation" @click="createItem"
        >Créer un article
      </router-link>
    </div>
    <div id="articles" class="msg" v-for="mess in msg" :key="mess.idMessages">
      <article class="article">
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <div class="like">
            <a><i class="far fa-thumbs-up" v-on:click="onLike(mess.id)"></i></a
            >{{ mess.likes }}
            <!--v-bind:style="{ color: activeColor }"-->
            <a v-on:click="onDislike(mess.id)"
              ><i class="far fa-thumbs-down"></i></a
            >{{ mess.dislikes }}
          </div>
          <div><i class="fas fa-comment-dots"></i>Commentaires</div>
          <a class="signaler"
            ><i class="far fa-flag"></i><span>Signaler ce commentaire</span></a
          >
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { DATE_FORMAT } from "../service/utility";
import axios from "axios";
export default {
  name: "itemAll",
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
        .then((test) => {
          console.log("mon test est " + test);
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
      })
      .catch((error) => console.log(error));
  },
  data() {
    return {
      message: "",
      msg: "",
      //activeColor: "white",
    };
  },
};
</script>

<style lang="scss">
section {
  width: 40%;
  margin-top: 80px;
  border: 1px solid white;
  border-radius: 20px;
  box-shadow: 1px 2px 2px;
  & .create {
    border-bottom: 1px solid white;
    padding: 20px 0;
    & .creation {
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: white;
    }
  }
}
#articles {
  margin: 20px 10px;
}
.article {
  border: 1px solid white;
  & .headArt {
    border-bottom: 1px solid white;
  }
  & .texte {
    padding: 20px;
  }
  & .footArt {
    border-top: 1px solid white;
    padding: 10px;
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
    &:hover span{
      display: inline;
      white-space: nowrap;
      color: white;
      padding: 3px;
    }
  & span {
    display: none;
  }
}
.far:active{
  color: red;
}
@media screen and (max-width: 767px) {
  section {
    width: 90%;
    margin: auto;
    margin-bottom: 20px;
    & .create {
      & .creation {
        font-size: 15px;
      }
    }
  }
  .article {
    font-size: 12px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  section {
    width: 70%;
    margin: auto;
  }
}
</style>