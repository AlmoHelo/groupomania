<template>
     <header>
        <img src="images/logo-white.png" alt="logo groupomania" />
    </header>
    <main>
        <h1>Identifiez-vous avec votre adresse e-mail</h1>
        <form method="post" action="#">
            <label for="email">E-mail ou nom d'utilisateur<span>*</span> :</label><input id="email" type="email" placeholder="groupomania@gmail.com" />
            <label for="Mot de passe">Mot de passe<span>*</span> :</label><input type="password" name="pass" id="Mot de passe" placeholder="*******"/>

        </form>
        <p class="champ">* : Champs obligatoires</p>
        <button>M'identifier</button>
        <p class="nouveau">Nouveau ? <a href="#">S'inscrire</a></p>
    </main>

    <footer>
        <p>Groupomania 2021 - Tout droits réservés.</p>
    </footer>
</template>

<script>
export default {
    name: 'login',
    props: ['/login', 'lien pour la connexion']
}
</script>

<style lang="css">
*{
    font-family: sans-serif;
}
body{
    background-color: #2C3F5D;
}
header{
    width: 500px;
    margin: auto;
}
img{
    height: 100px;
}
main{
    width: 800px;
    margin: auto;
    margin-top: 80px;
}
h1{
    color:white;
    width: 400px;
}
form{
    display: flex;
    flex-direction: column;
    font-size: 20px;
    color: white;
}
label{
    margin-top: 20px;
    margin-bottom: 5px;
}
span{
    color: #E99597;
}
input{
    height: 30px;
    border-radius: 8px;
    background-color: #3B547D;
    color: white;
}
.champ{
    color: #E99597;
    font-size: 12px;
}
button{
    background-color: #90A7CB;
    width: 100%;
    height: 30px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
}
input, button{
    border: none;
}
.nouveau{
    color: white;
    font-size: 12px;
}
a{
    color: white;
    text-decoration: none;
}
footer p{
    width: 300px;
    margin: auto;
    margin-top: 100px;
}
</style>