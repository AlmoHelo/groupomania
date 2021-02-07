<template>
  <section class="top">
    <h3>Les meilleurs articles :</h3>
    <div class="toparticle">
      <div class="entete topart">
        <p>1</p>
        <p>Nom utilisateur</p>
      </div>
      <p>contenu <br><br><br></p>
    </div>
    <div class="toparticle">
      <div class="entete topart">
        <p>2</p>
        <p>Nom utilisateur</p>
      </div>
      <p>contenu<br><br><br></p>
    </div>
    <div class="toparticle">
      <div class="entete topart">
        <p>3</p>
        <p>Nom utilisateur</p>
      </div>
      <p>contenu<br><br><br></p>
    </div>
    <div class="toparticle">
      <div class="entete topart">
        <p>4</p>
        <p>Nom utilisateur</p>
      </div>
      <p>contenu<br><br><br></p>
    </div>
    <div class="toparticle">
      <div class="entete topart">
        <p>5</p>
        <p>Nom utilisateur</p>
      </div>
      <p>contenu<br><br><br></p>
    </div>
  </section>
</template>

<script>
export default {
  name: "top",
};
</script>

<style lang="scss">
.top {
  border: 1px solid white;
  width: 40%;
  border-radius: 10px;
  padding-left: 10px;
}
.toparticle {
  width: 95%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  & p {
    background-color: #90a7cb;
    padding: 5px;
    border-radius: 5px;
  }
}
.topart {
  justify-content: space-between;
}
</style>