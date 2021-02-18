<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">S'identifier</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">S'inscrire</a></li>
    </ul>
  </div>

  <footer>Groupomania 2021 - Tout droits réservés</footer>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 80px 0 80px 0;
  font-size: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 150px;
}
li {
  display: inline-block;
  border: 1px solid #42b983;
  background-color: #42b983;
  border-radius: 10px;
  line-height: 40px;
  width: 200px;
  height: 40px;
  margin: 0 10px;
}
a {
  color: white;
  text-decoration: none;
  font-size: 22px;
  font-weight: bold;
}
li:hover{
  opacity: 0.7;
  border: 2px solid white;
}
</style>
