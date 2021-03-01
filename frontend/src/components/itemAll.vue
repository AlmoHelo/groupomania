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
            <a><i class="far fa-thumbs-up"></i></a>{{ mess.likes }}
            <a><i class="far fa-thumbs-down"></i></a>{{ mess.dislikes }}
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
        this.msg = response.data;
      })
      .catch((error) => console.log(error));
  },
  data() {
    return {
      data: JSON.parse(localStorage.getItem("itemAll")),
      message: "",
      msg: "",
    };
  },
};
</script>

<style lang="scss">
section {
  width: 40%;
  margin-top: 50px;
  border: 1px solid white;
  border-radius: 20px;
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
</style>