<template>
  <header class="headerAccueil">
    <img src="../components/images/logo-white.png" alt="logo groupomania" />
    <input type="search" placeholder="rechercher" />
    <div class="menu">
      <accueilLink/>
      <profilLink/>
      <decoLink />
    </div>
  </header>
</template>

<script>
import accueilLink from "../components/accueilLink.vue";
import profilLink from "../components/profilLink.vue";
import decoLink from "../components/decoLink.vue";
export default {
  name: "header",
  components: {
    accueilLink,
    profilLink,
    decoLink
  },
};
</script>

<style lang="scss">
.headerAccueil {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & input {
    width: 50%;
    height: 30px;
    border-radius: 8px;
    border: none;
    background-color: rgb(88, 84, 84);
    padding-left: 20px;
    &::placeholder {
      font-size: 15px;
      color: rgb(153, 150, 150);
    }
  }
  & .menu {
    width: 150px;
    display: flex;
    flex-direction: column;
  }
  & img {
    width: 250px;
    height: 50px;
  }
}
</style>