<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/icon-left-font-monochrome-black.png" />
    <h1 id="titleH1">Bienvenue sur le réseau social de votre entreprise !</h1>
    <div class="anim"></div>
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
  font-size: 40px;
}
.anim {
  width: 100%;
  margin: auto;
  margin-bottom: 80px;
  border-bottom: 5px solid #dfa9a99d;
  animation: borderTest 10s ease-in-out infinite;
}
@keyframes borderTest {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 150px;
}
.bouton, button {
  display: inline-block;
  border: 1px solid #F6D0D0;
  background-color: #F6D0D0;
  border-radius: 10px;
  line-height: 40px;
  width: 200px;
  height: 40px;
  margin: 20px 10px;
  text-decoration: none;
  font-size: 22px;
  color: black;
  font-weight: bold;
  font-family: RocknRollOne, Helvetica, Arial, sans-serif;
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

h1, h2, .creation, .title, .anim {
  font-family: RocknRollOne, Helvetica, Arial, sans-serif;
}
</style>
