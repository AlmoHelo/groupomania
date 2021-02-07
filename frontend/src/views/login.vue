<template>
  <header>
    <img src="../components/images/logo-white.png" alt="logo groupomania" />
  </header>
  <main>
    <h1 class="id">Identifiez-vous</h1>
    <form method="post" action="#">
      <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label
      ><input id="email" type="email" placeholder="groupomania@gmail.com" />
      <label for="Mot de passe">Mot de passe<span>*</span> :</label><input type="password" name="pass" id="Mot de passe" placeholder="*******"/>
    </form>
        <p class="champ">* : Champs obligatoires</p>
    <router-link to="/accueil" class="bouton" @click="pageaccueil">S'identifier</router-link>
    <p class="nouveau">Nouveau ? <router-link to="/signup" class="bouton2" @click="pagesignup">S'inscrire </router-link></p>
  </main>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>

</template>

<script>
export default {
  name: "login"
}
</script>

<style lang="scss">
*{
  color: white;
}
main{
  width: 50%;
  margin: auto;
  margin-top: 50px;
  & h1{
    width: 80%;
    margin: auto;
  }
}
form{
  display: flex;
  flex-direction: column;
  font-size: 22px;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  & label{
    margin-bottom: 15px;
    margin-top: 10px;
  }
  & input {
    border: none;
    border-radius: 8px;
    background-color: rgb(88, 84, 84);
    width: 500px;
    height: 30px;
    margin-left: 20px;
    &::placeholder{
      font-size: 15px;
      color: rgb(153, 150, 150);
    }
  }
}
.bouton{
  width: 300px;
  margin: auto;
  align-items: center;
  margin-bottom: 30px;
}
.nouveau, .champ{
  font-size: 13px;
  width: 140px;
  margin: auto;
  margin-bottom: 20px;
}
.nouveau{
  width: 120px;
}
.bouton2{
  text-decoration: underline;
}
</style>