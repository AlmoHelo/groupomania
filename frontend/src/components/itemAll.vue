<template>
  <section>
    <div class="create">
      <a> Créer un article </a>
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
          myArticle.className = "article"
          mySection.appendChild(myArticle);
          let myHead = document.createElement("div")
          myArticle.appendChild(myHead)

          const insertHeat = (div, nom) => {
            let myP = document.createElement("p");
            myP.innerHTML = nom;
            myHead.appendChild(myP);
          };
          const insertDescription = (div, description) => {
            let myDiv = document.createElement("p");
            myDiv.innerHTML = description;
            myArticle.appendChild(myDiv);
          };
          
          let myPseudo = document.createElement("p");
          let myDate = document.createElement("p");
          let myDescription = document.createElement("p");

          insertHeat(myPseudo, test[i].pseudoUser)
          insertHeat(myDate, test[i].date);
          insertDescription(myDescription, test[i].description);
        }
      })
      .catch((error) => console.log(error));

    /*let data = JSON.parse(localStorage.getItem("user"));
    //Appel à l'Api pour l'affichage des informations utilisateurs
    axios
      .get(`api/item/${data.userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.log(error));*/
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 50%;
  margin-top: 50px;
  border: 1px solid white;
  border-radius: 20px;
  & .create {
    border-bottom: 1px solid white;
    padding: 10px 0;
    & a {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
#articles {
  border: 1px solid red;
  & .article{
    font-size: 100px;
  }
}
</style>