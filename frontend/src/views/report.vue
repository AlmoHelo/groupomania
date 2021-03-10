<template>
  <headerAll />
  <h2> Signalement des articles : </h2>
    <reportItem/>
  <h2> Signalement des commentaires : </h2>
    <reportComment/>
  <footerAll />
</template>

<script>
import headerAll from "../components/headerAll";
import reportItem from "../components/reportItem"
import reportComment from "../components/reportComment"
import footerAll from "../components/footerAll"
export default {
  name: "report",
  components: { headerAll, reportItem, reportComment, footerAll },
};
</script>

<style lang="scss" scoped>
</style>