<template>
  <header>
    <img src="../components/images/logo-white.png" alt="logo groupomania" />
  </header>
  <section>
    <h1 class="bienvenue">Bienvenue sur Groupomania</h1>
    <p>le réseau social d'entreprise</p>
    <div class="lesboutons">
      <router-link to="/login" class="bouton" @click="pagelogin">M'identifier </router-link>
      <router-link to="/signup" class="bouton" @click="pagesignup">S'inscrire </router-link>
    </div>
  </section>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
export default {
  name: "home"
};
</script>
<style lang="css">
* {
  font-family: sans-serif;
}
body {
  background-color: #2c3f5d;
}
header {
  width: 500px;
  margin: auto;
}
img {
  height: 100px;
}
section {
  width: 800px;
  margin: auto;
  margin-top: 80px;
}
.bienvenue{
  color: white;
  width: 100%;
  font-size: 45px;
  padding: 0;
}
h1 + p {
  color: white;
  font-size: 35px;
  margin-bottom: 100px;
}
.lesboutons{
  display: flex;
  justify-content: center;
}
.bouton {
  background-color: #90a7cb;
  width: 45%;
  height: 30px;
  margin-right: 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  border: none;
  box-shadow: 1px 1px 1px #90a7cb;
}
a {
  color: white;
  text-decoration: none;
}
footer p {
  width: 300px;
  margin: auto;
  margin-top: 100px;
}
</style>