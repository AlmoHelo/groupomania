  <template>
  <section class="touslesarticles">
    <div class="secCreer">
      <button class="creer">Créer un message</button>
    </div>
    <article>
      <div class="entete">
        <p>Nom utilisateur</p>
        <p>Date</p>
      </div>
      <p class="contenu">
        Contenu de l'article<br /><br /><br /><br /><br /><br />
      </p>
      <div class="bas">
        <p>Like/Dislike</p>
        <p>Commentaires</p>
        <p>Partager</p>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "articleAccueil",
};
</script>

<style lang="scss">
.secCreer {
  border-bottom: 1px solid white;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.creer {
  border: none;
  width: 200px;
  height: 20px;
  background-color: rgb(88, 84, 84);
  border-radius: 8px;
}
.touslesarticles {
  width: 50%;
  border-radius: 10px;
  border: 1px solid white;
}
article {
  width: 90%;
  max-height: 300px;
  background-color: white;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 20px;
}
.entete {
  border-bottom: 2px solid #2c3f5d;
  display: flex;
  justify-content: space-around;
  & p {
    background-color: #90a7cb;
    padding: 5px;
    border-radius: 5px;
  }
}
.contenu {
  background-color: #90a7cb;
  margin: 15px 5px 15px 5px;
  padding: 5px;
  border-radius: 5px;
}
.bas {
  border-top: 2px solid #2c3f5d;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  & p {
    background-color: #90a7cb;
    margin: 5px 5px 5px 5px;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>