<template>
  <section>
    <h2>Top 3</h2>
    <article id="bestArticles"></article>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "bestItem",
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
        let itemTable = localStorage.getItem("itemTop");
        let testBest = JSON.parse(itemTable);

        let mySectionBest = document.getElementById("bestArticles");

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
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid white;
  border-radius: 20px;
  width: 40%;
  max-height: 420px;
  margin-top: 50px;
  overflow: hidden;
  & h2 {
    border-bottom: 1px solid white;
    width: 100%;
    text-align: start;
    font-weight: normal;
    padding: 10px 10px;
  }
}
article {
  border: 1px solid white;
  margin: 20px;
}
</style>