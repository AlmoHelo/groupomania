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
        id="password"
        v-model="password"
        placeholder="*******  (min 8 caractères, 1 lettre majuscule et minuscule et 1 chiffre obligatoire)"
        required
      />
      <p class="errorMsg">{{ errPasswordReg }}</p>
      <label for="password2" maxlength="8"
        >Confirmation mot de passe<span>*</span> :</label
      ><input
        type="password"
        name="pass"
        id="Mot de passe2"
        v-model="password2"
        placeholder="*******"
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
      errPasswordReg: "",
    };
  },
  methods: {
    sendUpdate: function () {
      let profil = JSON.parse(localStorage.getItem("userProfil"));
      let userId = profil.userId;
      let user = JSON.parse(localStorage.getItem("user"));
      const lowcaseReg = /[a-z]+/;
      const uppercaseReg = /[A-Z]+/;
      const minCharactersReg = /.{8,}/;
      const numberReg = /[0-9]+/;

      const myPassword = this.password;
      if (
        myPassword.match(lowcaseReg) == null ||
        myPassword.match(uppercaseReg) == null ||
        myPassword.match(minCharactersReg) == null ||
        myPassword.match(numberReg) == null
      ) {
        this.errPasswordReg =
          "Votre mot de passe doit contenir au moins une minuscule, une majuscule et un nombre. Il doit avoir au minimum 8 caractères !";
        console.log("ok");
      } else {
        console.log("pasOk");
        if (this.password != this.password2) {
          this.errPassword = "Veuillez mettre des mots de passe identiques";
          this.errPasswordReg = "";
          this.errEmail = "";
          this.errPseudo = "";
          let myPassword = document.getElementById("Mot de passe2");
          myPassword.style.border = "1px solid red";
          myPassword.animate(
            [
              { transform: "translateX(10px)" },
              { transform: "translateX(-10px)" },
            ],
            { duration: 60, iterations: 4, easing: "ease-in-out" }
          );
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
                  authorization: "Bearer " + user.token,
                },
              }
            )
            .then((response) => {
              alert(response.data.message);
              localStorage.removeItem("userProfil");
              axios
                .get("http://localhost:3000/api/auth/" + userId, {
                  headers: {
                    authorization: "Bearer " + user.token,
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
              let msgErr = JSON.stringify(error);
              if (msgErr.includes("410")) {
                this.errEmail = "E-mail déjà utilisé !!";
                this.errPassword = "";
                this.errPseudo = "";
                let myEmail = document.getElementById("email");
                myEmail.style.border = "1px solid red";
                myEmail.animate(
                  [
                    { transform: "translateX(10px)" },
                    { transform: "translateX(-10px)" },
                  ],
                  { duration: 60, iterations: 4, easing: "ease-in-out" }
                );
              } else if (msgErr.includes("420")) {
                this.errPseudo = "Pseudo déjà utilisé !";
                this.errEmail = "";
                this.errPassword = "";
                let myPseudo = document.getElementById("pseudo");
                myPseudo.style.border = "1px solid red";
                myPseudo.animate(
                  [
                    { transform: "translateX(10px)" },
                    { transform: "translateX(-10px)" },
                  ],
                  { duration: 60, iterations: 4, easing: "ease-in-out" }
                );
              }
              console.log("la connexion a échouée" + error);
            });
        }
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
  button {
    width: 180px;
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>