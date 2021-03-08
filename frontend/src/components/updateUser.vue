<template>
  <div class="all">
    <h2>Modifier votre profil</h2>
    <form method="Put" @submit.prevent="sendUpdate">
      <label for="email">E-mail<span>*</span> :</label
      ><input
        id="email"
        type="email"
        v-model="email"
        placeholder="groupomania@gmail.com"
        required
      />
      <p class="errorMsg">{{ errEmail }}</p>
      <label for="password" maxlength="8">Mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe"
        v-model="password"
        placeholder="*******  (max 8 caractères)"
        required
      />
      <label for="password2" maxlength="8"
        >Confirmation mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe2"
        v-model="password2"
        placeholder="*******  (max 8 caractères)"
        required
      />
      <p class="errorMsg">{{ errPassword }}</p>
      <label for="pseudo" maxlength="8">Pseudo<span>*</span> :</label
      ><input
        type="name"
        name="name"
        id="pseudo"
        v-model="pseudo"
        placeholder="Groupo  (max 8 caractères)"
        required
      />
      <p class="errorMsg">{{ errPseudo }}</p>
      <label for="Biographie">Biographie :</label
      ><textarea name="biographie" v-model="biographie" id="biographie" />
      <p class="champ">* : Champs obligatoires</p>
      <button type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "updateUser",
  data() {
    return {
      //for errors
      errEmail: "",
      errPseudo: "",
      errPassword: "",
    };
  },
  methods: {
    sendUpdate: function () {
      let profil = JSON.parse(localStorage.getItem("userProfil"));
      let userId = profil.userId;
      let user = JSON.parse(localStorage.getItem("user"));
      if (this.password != this.password2) {
        this.errPassword = "Veuillez mettre des mots de passe identiques";
      } else {
        axios
          .put(
            "http://localhost:3000/api/auth/" + userId,
            {
              id: profil.userId,
              email: this.email,
              password: this.password,
              pseudo: this.pseudo,
              biographie: this.biographie,
            },
            {
              headers: {
                authorization: "Bearer " + user.reponse.token,
              },
            }
          )
          .then((response) => {
            alert(response.data.message);
            localStorage.removeItem("userProfil");
            axios
              .get("http://localhost:3000/api/auth/" + userId, {
                headers: {
                  authorization: "Bearer " + user.reponse.token,
                },
              })
              .then((response) => {
                console.log(response.data[0]);
                let profil = JSON.stringify(response.data[0]);
                localStorage.setItem("userProfil", profil);
                window.location.href = "http://localhost:8080/items/profil";
              })
              .catch((error) => {
                console.log(error);
                this.err;
              });
          })
          .catch((error) => {
            console.log(error);
            let msgErr = JSON.stringify(error);
            if (msgErr.includes("410")) {
              this.errEmail = "E-mail déjà utilisé !!";
              this.errPassword = "";
            } else if (msgErr.includes("420")) {
              this.errPseudo = "Pseudo déjà utilisé !";
              this.errEmail = "";
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.errorMsg {
  color: rgb(124, 51, 51);
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}
.all {
  width: 98%;
  & h2 {
    width: 100%;
  }
}
form {
  display: flex;
  flex-direction: column;
  & label {
    margin-top: 20px;
  }
  & input,
  textarea {
    background-color: #c3c3c3;
    width: 60%;
    height: 30px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: none;
    &::placeholder {
      font-size: 15px;
      color: rgb(39, 38, 38);
    }
  }
  & textarea {
    height: 70px;
  }
}
button {
  margin: auto;
  margin-top: 20px;
}
@media screen and (max-width: 767px) {
  form {
    & input,
    textarea {
      width: 80%;
      height: 20px;
      border-radius: 5px;
      &::placeholder {
        font-size: 12px;
      }
    }
    & textarea {
      height: 70px;
    }
  }
  button{
    width: 180px;
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>