<template>
  <headerPage/>

  <articleAccueil/>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
import headerPage from "../components/headerpage.vue";
import articleAccueil from "../components/articleAccueil.vue"
export default {
  name: "accueil",
  components:{
     headerPage,
     articleAccueil
  }
}
</script>

<style lang="scss">


</style>