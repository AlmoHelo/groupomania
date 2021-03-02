<template>
  <section>
    <h2>Top 3</h2>
    <div class="allBest">
      <div
        class="article"
        v-for="mess in msg.slice(0, 3)"
        :key="mess.idMessages"
      >
        <div class="headArt">
          <p>{{ mess.pseudoUser }}</p>
          <p>{{ mess.date }}</p>
        </div>
        <p class="texte">{{ mess.description }}</p>
        <div class="footArt">
          <i class="far fa-thumbs-up"></i>
          <i class="far fa-thumbs-down"></i>
          <i class="fas fa-comment-dots"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "bestItem",
  data() {
    return {
      data: JSON.parse(localStorage.getItem("itemTop")),
      message: "",
      msg: "",
    };
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
        localStorage.setItem("itemTop", tableau);

        this.msg = response.data;
        /*let itemTable = localStorage.getItem("itemTop");
        let testBest = JSON.parse(itemTable);*/

        /* let mySectionBest = document.getElementById("bestArticles");

        for (let i = 0; i < testBest.length; i++) {
          for (i = 0; i < 3; i++) {
            let myArticleBest = document.createElement("div");
            myArticleBest.style.border = "1px solid white";
            mySectionBest.appendChild(myArticleBest);
            let myHeadBest = document.createElement("div");
            myArticleBest.appendChild(myHeadBest);

            const insertPseudoBest = (div, nom) => {
              let myPBest = document.createElement("p");
              myPBest.innerHTML = nom;
              myHeadBest.appendChild(myPBest);
            };
            const insertDescriptionBest = (div, description) => {
              let myDivBest = document.createElement("p");
              myDivBest.innerHTML = description;
              myArticleBest.appendChild(myDivBest);
            };

            let myPseudoBest = document.createElement("p");
            let myDescriptionBest = document.createElement("p");

            insertPseudoBest(myPseudoBest, testBest[i].pseudoUser);
            insertDescriptionBest(myDescriptionBest, testBest[i].description);
          }
        }*/
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
        & p{
          margin: 5px 0;
        }
      }
      & .texte{
        height: 50px;
      }
      & .footArt {
        height: 10px;
      }
    }
  }
}
</style>