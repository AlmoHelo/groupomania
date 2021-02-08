<template>
  <headerPage />
  <section class="sectionAccueil">
    <articleAccueil />
    <top />
  </section>

  <footer>
    <p>Groupomania 2021 - Tout droits réservés.</p>
  </footer>
</template>

<script>
import headerPage from "../components/headerpage.vue";
import articleAccueil from "../components/articleAccueil.vue";
import top from "../components/top.vue";
export default {
  name: "accueil",
  components: {
    headerPage,
    articleAccueil,
    top,
  },
};
</script>

<style lang="scss">
.sectionAccueil {
  display: flex;
}
</style>