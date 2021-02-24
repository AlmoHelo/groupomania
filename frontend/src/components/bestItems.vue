<template>
  <section>
    <h2>Top 3</h2>
    <article>
      <a href="#">Nom d'utilisateur</a>
      <p>Texte</p>
      <div>
        <div>Like/Dislike</div>
        <div>Comm/Partager</div>
      </div>
    </article>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid white;
  border-radius: 20px;
  width: 40%;
  margin-top: 50px;
  overflow: hidden;
  & h2 {
    border-bottom: 1px solid white;
    width: 100%;
    text-align: start;
    font-weight: normal;
    padding: 10px 10px;
  }
}
article{
    border: 1px solid white;
    margin: 20px;
}
</style>