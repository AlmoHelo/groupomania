<template>
  <headerPage />

    <section class="secCreer">
      <button class="creer">Créer un message</button>
    </section>
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
.secCreer{
  border-bottom: 3px solid white;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.creer{
  border: 1px solid red;
}

.sectionAccueil {
  display: flex;
}
</style>