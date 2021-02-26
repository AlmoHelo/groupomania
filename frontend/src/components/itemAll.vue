<template>
  <section>
    <div class="create">
      <router-link to="/create" class="creation" @click="createItem">Créer un article </router-link>
    </div>
    <div id="articles"></div>
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
        let tableau = JSON.stringify(response.data);
        localStorage.setItem("itemAll", tableau);
        let itemTable = localStorage.getItem("itemAll");
        let test = JSON.parse(itemTable);

        let mySection = document.getElementById("articles");

        for (let i = 0; i < test.length; i++) {
          let myArticle = document.createElement("div");
          myArticle.className = "articles";
          myArticle.style.border = "1px solid white";
          myArticle.style.marginBottom = "20px";
          let myHead = document.createElement("div");
          myHead.style.display = "flex";
          myHead.style.justifyContent = "space-between";
          myHead.style.marginBottom = "20px";
          let myFoot = document.createElement("div");
          myFoot.className = "foot";
          myFoot.style.borderTop = "1px solid white";
          myFoot.style.display = "flex";
          myFoot.style.justifyContent = "space-around";
          let myLikes = document.createElement("div");
          myLikes.style.display = "flex";
          mySection.appendChild(myArticle);
          myArticle.appendChild(myHead);

          const insertHeat = (div, nom) => {
            let myP = document.createElement("p");
            myP.innerHTML = nom;
            myHead.appendChild(myP);
          };
          const insertDescription = (div, description) => {
            let myDiv = document.createElement("p");
            myDiv.innerHTML = description;
            myDiv.style.color = "black";
            myDiv.style.fontWeight = "bold"
            myDiv.style.marginBottom = "50px"
            myArticle.appendChild(myDiv);
          };
          const insertLike = (div, like) => {
            let myDiv = document.createElement("p");
            myDiv.innerHTML = like;
            myLikes.appendChild(myDiv);
          };

          let myPseudo = document.createElement("p");
          let myDate = document.createElement("p");
          let myDescription = document.createElement("p");
          let firstI = document.createElement("p");
          firstI.innerHTML = "👍";
          let like = document.createElement("p");
          let secondI = document.createElement("p");
          secondI.innerHTML = "👎";
          let comments = document.createElement("p");
          comments.innerHTML = "💬 commentaires";
          let share = document.createElement("p");
          share.innerHTML = "💬 Partager";

          insertHeat(myPseudo, test[i].pseudoUser);
          insertHeat(myDate, test[i].date);
          insertDescription(myDescription, test[i].description);
          myArticle.appendChild(myFoot);
          myFoot.appendChild(myLikes);
          myLikes.appendChild(firstI);
          insertLike(like, test[i].likes);
          myLikes.appendChild(secondI);
          insertLike(like, test[i].dislikes);
          myFoot.appendChild(comments);
          myFoot.appendChild(share);
        }
      })
      .catch((error) => console.log(error));
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
.articles {
  border: 1px solid red;
}
</style>