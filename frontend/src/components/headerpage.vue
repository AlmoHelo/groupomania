<template>
  <header>
    <img src="../components/images/logo-white.png" alt="logo groupomania" />
    <main class="menu">
      <accueilLink/>
      <decoLink/>
    </main>
  </header>
</template>

<script>
import accueilLink from "../components/accueilLink.vue";
import decoLink from "../components/decoLink.vue"
export default {
    name: "header",
    components: {
      accueilLink,
      decoLink
    }
}
</script>

<style lang="scss">
header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .menu{
    width: 150px;
  }
  & img{
  width: 250px;
  height: 60px;
}
}

</style>