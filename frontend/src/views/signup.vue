<template>
     <header>
        <img src="../components/images/logo-white.png" alt="logo groupomania"  />
    </header>
    <main>
        <h1 class="id">Inscrivez-vous</h1>
        <form method="post" action="#">
            <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label><input id="email" type="email" placeholder="groupomania@gmail.com" />
            <label for="Mot de passe" maxlength="8">Mot de passe<span>*</span> :</label><input type="password" name="pass" id="Mot de passe" placeholder="*******  (max 8 caractères)"/>
            <label for="Confirmation">Confirmation mot de passe<span>*</span> :</label><input type="password" name="pass" id="Confirmation" placeholder="*******"/>
            <label for="Nom d'utilisateur" maxlength="8">Nom d'utilisateur<span>*</span> :</label><input type="name" name="name" id="Nom d'utilisateur" placeholder="Groupo  (max 8 caractères)"/>
            <label for="Biographie">Biographie :</label><textarea type="text" name="biographie" id="biographie"/>

        </form>
        <p class="champ">* : Champs obligatoires</p>
        <router-link to="/accueil" class="bouton" @click="pageaccueil">S'inscrire</router-link>
    </main>

    <footer>
        <p>Groupomania 2021 - Tout droits réservés.</p>
    </footer>
</template>

<script>
export default {
  name: "signup"
};
</script>

<style lang="scss">
textarea{
    width: 500px;
    height: 70px;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: rgb(88, 84, 84);
    border-radius: 8px;
    border: none;
}
</style>