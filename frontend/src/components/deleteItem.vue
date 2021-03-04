<template>
  <button @click="supprimerItem(mess.id)">
    <i class="fas fa-trash-alt"></i> Supprimer
  </button>
</template>

<script>
//import axios from "axios"
export default {
  name: "deleteItem",
  methods: {
    supprimerItem: function (messId) {
        let myIdItem = messId;
        console.log(myIdItem)
      /*axios
        .delete("http://localhost:3000/api/item/" + , {
          headers: {
            authorization: "Bearer " + user.reponse.token,
          },
        })
        .then((response) => {
          let message = JSON.parse(JSON.stringify(response));
          alert(message.data.message);
          window.location.href = "http://localhost:8080/";
          localStorage.clear();
        })
        .catch((error) => console.log(error));*/
    },
  },
};
</script>