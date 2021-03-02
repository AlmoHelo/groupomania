<template>
  <section>
    <div class="create">
      <router-link to="/items/create" class="creation" @click="createItem"
        >Créer un article
      </router-link>
    </div>
    <div
      id="articles"
      class="msg"
      v-for="(mess, index) in msg"
      :key="mess.idMessages"
    >
      <article class="article">
        <div class="headArt">
          <p id="idItem">{{ index }} || {{ mess.id }}</p>
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <div class="like">
            <a><i class="far fa-thumbs-up" v-on:click="onLike()"></i></a
            >{{ mess.likes }}
            <a v-on:click="onDislike()"><i class="far fa-thumbs-down"></i></a
            >{{ mess.dislikes }}
          </div>
          <div><i class="fas fa-comment-dots"></i>Commentaires</div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "itemAll",
  methods: {
    onLike: function () {
      this.like = 1;
      let index = this.index;
      console.log(this.message[index]);
      let user = JSON.parse(localStorage.getItem("user"));
      //let idItem = JSON.parse(localStorage.getItem("itemAll"));

      //console.log(idItem.id);
      axios
        .post(
          "http://localhost:3000/api/items/" + user.reponse.userId + "/like",
          {
            userId: user.reponse.userId,
            email: user.mail,
            like: this.like,
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
    onDislike: function () {
      this.dislike = 1;

      let user = JSON.parse(localStorage.getItem("user"));
      //let idItem = JSON.parse(localStorage.getItem("itemAll"));

      let test = document.getElementById("idItem");

      console.log(test);

      //console.log(idItem.id);
      axios
        .post(
          "http://localhost:3000/api/items/" + user.reponse.userId + "/like",
          {
            userId: user.reponse.userId,
            email: user.mail,
            dislike: this.dislike,
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
        let tableau = JSON.stringify(response.data);
        localStorage.setItem("itemAll", tableau);
        this.msg = response.data;
      })
      .catch((error) => console.log(error));
  },
  data() {
    return {
      data: JSON.parse(localStorage.getItem("itemAll")),
      message: "",
      msg: "",
      like: "",
      index: "",
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