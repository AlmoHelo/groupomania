<template>
  <section>
    <div class="create">
      <a> Créer un article </a>
    </div>
    <article>
      <div class="en-tete">
        <img />
        <p>Nom utilisateur</p>
        <p>Date</p>
      </div>
      <div>Le texte</div>
      <div>
        <ul>
          <p>Like Dislike</p>
          <p>Commentaire</p>
          <p>Partager</p>
        </ul>
      </div>
    </article>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "itemAll",
  beforeMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get("http://localhost:3000/api/item/getAll", 
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ` + user.reponse.token , //Renvoi du token par l'api en cas d'authentification
              },
            })
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => console.log("C'est une erreur !!!!!!!! " + error));

    let data = JSON.parse(localStorage.getItem("user"));
    //Appel à l'Api pour l'affichage des informations utilisateurs
    axios
      .get(`api/item/${data.userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.log(error));
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
article{
    border: 1px solid white;
    margin: 20px;
}
</style>