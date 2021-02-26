<template>
  <headerAll />
  <h1>Bonjour {{ pseudo }}, vous êtes sur votre profil !</h1>
  <section class="profil">
    <p>Adresse mail : {{ mail }}</p>
    <p>Inscrit depuis le : {{ date }}</p>
    <p>Biographie : {{ biographie }}</p>
  </section>
  <section id="articlesPerso">
    <h2>Tous vos articles</h2>
  </section>
</template>

<script>
import axios from "axios";
import headerAll from "../components/headerAll";
export default {
  name: "Profil",
  components: { headerAll },
  data() {
    return {
      pseudo: "",
      mail: "",
      date: "",
      biographie: "",
    };
  },
  mounted() {
    let profil = JSON.parse(localStorage.getItem("userProfil"));
    console.log(profil);
    this.pseudo = profil.pseudo;
    this.mail = profil.email;
    this.date = profil.creationDate;
    if (profil.biographie != null) {
      this.biographie = profil.biographie;
    } else {
      this.biographie = "Modifier votre profil pour ajouter une biographie";
    }
    let userId = profil.userId;
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:3000/api/items/" + userId, {
        headers: {
          authorization: "Bearer " + user.reponse.token,
        },
      })
      .then((response) => {
        console.log(response);
        let tableau = JSON.parse(JSON.stringify(response.data));
        console.log(tableau);

        let mySection = document.getElementById("articlesPerso");

        for (let i = 0; i < tableau.length; i++) {
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
            myDiv.style.fontWeight = "bold";
            myDiv.style.marginBottom = "50px";
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

          insertHeat(myPseudo, tableau[i].pseudoUser);
          insertHeat(myDate, tableau[i].date);
          insertDescription(myDescription, tableau[i].description);
          myArticle.appendChild(myFoot);
          myFoot.appendChild(myLikes);
          myLikes.appendChild(firstI);
          insertLike(like, tableau[i].likes);
          myLikes.appendChild(secondI);
          insertLike(like, tableau[i].dislikes);
          myFoot.appendChild(comments);
          myFoot.appendChild(share);
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.profil {
  box-shadow: 1px 1px 0px white;
  width: 70%;
  margin: auto;
  margin-bottom: 50px;
}
#articlesPerso {
  padding: 10px;
  width: 70%;
  margin: auto;
  & h2 {
    font-size: 25px;
    width: 100%;
  }
}
</style>