<template>
    <main id="formSignup">
        <h2 class="id">Inscrivez-vous</h2>
        <form method="post" action="#">
          <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label
          ><input
            id="emailSign"
            type="email"
            placeholder="groupomania@gmail.com"
          />
          <label for="password" maxlength="8"
            >Mot de passe<span>*</span> :</label
          ><input
            type="password"
            name="pass"
            id="passwordSign"
            placeholder="*******  (max 8 caractères)"
          />
          <label for="pseudo" maxlength="8"
            >Nom d'utilisateur<span>*</span> :</label
          ><input
            type="name"
            name="name"
            id="pseudo"
            placeholder="Groupo  (max 8 caractères)"
          />
          <label for="Biographie">Biographie :</label
          ><textarea type="text" name="biographie" id="biographie" />
        </form>
        <p class="champ">* : Champs obligatoires</p>
        <router-link to="/accueil" class="bouton">S'inscrire</router-link>
      </main>

    <footer>
        <p>Groupomania 2021 - Tout droits réservés.</p>
    </footer>
</template>

<script>
export default {
  name: "SignupForm",
};
</script>
<style lang="scss" scoped>
* {
  color: white;
}
main {
  width: 50%;
  margin: auto;
  margin-top: 50px;
  & h1 {
    width: 80%;
    margin: auto;
  }
}
form {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  & label {
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
    &::placeholder {
      font-size: 15px;
      color: rgb(153, 150, 150);
    }
  }
}
.bouton {
  width: 300px;
  margin: auto;
  align-items: center;
  margin-bottom: 30px;
}
.nouveau,
.champ {
  font-size: 13px;
  width: 140px;
  margin: auto;
  margin-bottom: 20px;
}
.nouveau {
  width: 120px;
}
.bouton2 {
  text-decoration: underline;
}
textarea {
  width: 500px;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: rgb(88, 84, 84);
  border-radius: 8px;
  border: none;
}
</style>