<template>
  <header>
    <img alt="Vue logo" src="../assets/img/logo-white.png" />
    <input type="search"/>
    <ul>
      <a href="/accueil"> Accueil </a>
      <a href="#"> Profil </a>
      <a href="/"> Deconnexion </a>
    </ul>
  </header>
</template>

<script>
export default {
  name: "headerAll",
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  & img {
    width: 20%;
    height: 70px;
    margin: 0;
  }
  & input {
      width: 35%;
      height: 30px;
      background-color: rgb(148, 147, 147);
      border: none;
  }
  & ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    & a {
      color: white;
      text-decoration: none;
    }
  }
}
</style>