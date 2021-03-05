<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <h1 id="titleH1">Bienvenue sur le réseau social de votre entreprise !</h1>

    <ul>
      <router-link to="/login" class="bouton" @click="pagelogin"
        >M'identifier
      </router-link>
      <router-link to="/signup" class="bouton" @click="pagesignup"
        >S'inscrire
      </router-link>
    </ul>
  </div>

  <footer>Groupomania 2021 - Tout droits réservés</footer>
</template>

<script>
export default {
  name: "Home",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  margin: 80px 0 80px 0;
  font-size: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 150px;
}
.bouton, button {
  display: inline-block;
  border: 1px solid #5a85b1;
  background-color: #5a85b1;
  border-radius: 10px;
  line-height: 40px;
  width: 200px;
  height: 40px;
  margin: 20px 10px;
  color: white;
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
  &:hover {
    opacity: 0.7;
    border: 2px solid white;
  }
}
button:hover {
  opacity: 0.7;
  border: 2px solid white;
}
footer {
  margin: 4% 0;
}

@media screen and (max-width: 767px) {
  img {
    width: 95%;
  }
  h1 {
    font-size: 22px;
  }
  ul {
    margin-bottom: 120px;
  }
  .bouton {
    margin: 20px 5px;
  }
  footer {
    margin: 20% 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  img {
    width: 95%;
  }
  h1 {
    font-size: 22px;
  }
  ul {
    margin-bottom: 120px;
  }
  .bouton {
    margin: 30px 10px;
  }
}
</style>
