<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <h1 id="titleH1">Bienvenue sur le réseau social de votre entreprise !</h1>

    <ul>
      <router-link to="/login" class="bouton" @click="pagelogin">M'identifier </router-link>
      <router-link to="/signup" class="bouton" @click="pagesignup">S'inscrire </router-link>
    </ul>

  </div>

  <footer>Groupomania 2021 - Tout droits réservés</footer>
</template>

<script>
export default {
  name: "Home"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@keyframes myMove {
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
h1 {
  margin: 80px 0 80px 0;
  font-size: 40px;
}
h2 {
  width: 80%;
  margin: auto;
  font-size: 30px;
  margin-bottom: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 150px;
}
//Page Login
#formLog {
  display: none;
  border: 1px solid white;
  width: 70%;
  margin: auto;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 1px 1px 2px white;
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
    & label {
      font-size: 20px;
      margin: 15px;
      width: 50%;
      text-align: left;
    }
    & input {
      width: 45%;
      height: 25px;
      font-size: 18px;
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
}
.nouveau {
  margin-top: 50px;
  & #signupPage2 {
    background: none;
    border: none;
    font-size: 14px;
    padding: 0;
    margin: 0;
    width: 70px;
    margin-left: 0;
  }
}
//Page Signup
#formSignup {
  display: none;
  border: 1px solid white;
  width: 70%;
  margin: auto;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 1px 1px 2px white;
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
    & label {
      font-size: 20px;
      margin: 15px;
      width: 50%;
      text-align: left;
    }
    & input {
      width: 45%;
      height: 25px;
      font-size: 18px;
      margin-left: 30px;
      margin-bottom: 20px;
    }
    & textarea {
      width: 45%;
      height: 80px;
      font-size: 18px;
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
}
//Pour les deux
button,
.bouton {
  display: inline-block;
  border: 1px solid #5a85b1;
  background-color: #5a85b1;
  border-radius: 10px;
  line-height: 40px;
  width: 200px;
  height: 40px;
  margin: 0 10px;
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
</style>
