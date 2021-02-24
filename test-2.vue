
  el: "#logPage",
  data() {
    return {
      emailLog: "",
      passwordLog: "",
      message: "",
      emailSign: "",
      passwordSign: "",
      passwordSign2: "",
      pseudoSign: "",
      biographieSign: "",
    };
  },
  methods: {
    envoie: function () {
      let token = "";
      axios
        .post(
          "http://localhost:3000/api/auth/login",
          { email: this.emailLog, password: this.passwordLog },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer${token}`,
            },
          }
        )
        .then((response) => {
          let rep = response.data;
          console.log("Connexion réussie !");
          let userObj = JSON.stringify(rep);
          this.$localStorage.set("user", userObj);
          let user = JSON.parse(this.$localStorage.get("user"));
          token = user.token;
          if (user.email == this.email) {
            window.location.href = "http://localhost:8080/accueil";
            location.reload(true);
          } else {
            alert("Utilisateur non trouvé !");
          }
        })
        .catch(() => {
          console.log("La connexion a échouée !");
          alert("Pseudo ou mot de passe incorrect");
          document.querySelector("#smallpass").innerHTML =
            "pseudo ou mot de  passe incorrect";
        });
    },
    envoieSign: function () {
      //Fonction qui envoi le formulaire d'inscription à l'API
      let token = "";
      if (
        this.emailSign == "" ||
        this.pseudoSign == "" ||
        this.passwordSign == ""
      ) {
        alert(
          "Veuillez remplir tous les champs avant d'envoyer le formulaire !"
        );
      } else if (this.passwordSign != this.passwordSign2) {
        //Forfitification par la complétion du password 2 fois
        alert("Les deux mots de passe ne sont pas identiques !");
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/signup",
            {
              email: this.emailSign,
              pseudo: this.pseudoSign,
              password: this.passwordSign,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Inscription réussi !");
            let rep = response.data;
            let userObject = JSON.stringify(rep);
            this.$localStorage.set("user", userObject);
            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token; //Token d'authentification
            alert(
              "Félicitation vous êtes désormais inscrit, connectez-vous dès maintenant"
            );
            window.location.href = "http://localhost:8080/accueil";
          })
          .catch(() => console.log("Echec de l'inscription"));
      }
    },
    verif: function () {
      //Fonction de vérification du password
      if (this.password != this.password2) {
        document.getElementById("confirm").innerHTML =
          "Veuillez entrer le même mot de passe";
      } else {
        document.getElementById("confirm").innerHTML = "";
      }
    },

    /*
    envoie: function () {
      //let myEmail = document.getElementById("email").value;
      //let myPassword = document.getElementById("password").value;
      let token = "";
      if (this.emailLog == "" || this.passwordLog == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/login",
            { email: this.emailLog, password: this.passwordLog },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}`,
              },
            }
          )
          .then((response) => {
            let rep = response.data;
            console.log("Connexion réussie !");
            let userObj = JSON.stringify(rep);
            this.$localStorage.set("user", userObj);
            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.email == "admin") {
              window.location.href = "http://localhost:8080/accueil";
              location.reload(true);
            } else {
              alert("Utilisateur non trouvé !");
            }
          })
          .catch(() => {
            console.log("La connexion a échouée !");
            alert("Pseudo ou mot de passe incorrect");
            document.querySelector("#smallpass").innerHTML =
              "pseudo ou mot de  passe incorrect";
          });
      }
    },*/

    logPage: function () {
      let titleh1 = document.getElementById("titleH1");
      let buttonLog = document.getElementById("logPage");
      let buttonSignup = document.getElementById("signupPage");
      let logForm = document.getElementById("formLog");
      titleh1.style.display = "none";
      buttonLog.style.display = "none";
      buttonSignup.style.display = "none";
      logForm.style.animation = "myMove 4s";
      logForm.style.display = "block";
    },
    signupPage: function () {
      let titleh1 = document.getElementById("titleH1");
      let buttonLog = document.getElementById("logPage");
      let buttonSignup = document.getElementById("signupPage");
      let signupForm = document.getElementById("formSignup");
      titleh1.style.display = "none";
      buttonLog.style.display = "none";
      buttonSignup.style.display = "none";
      signupForm.style.animation = "myMove 4s";
      signupForm.style.display = "block";
    },
    signupPage2: function () {
      let titleh1 = document.getElementById("titleH1");
      let buttonSignup = document.getElementById("signupPage");
      let signupForm = document.getElementById("formSignup");
      let logForm = document.getElementById("formLog");
      titleh1.style.display = "none";
      buttonSignup.style.display = "none";
      logForm.style.display = "none";
      signupForm.style.animation = "myMove 4s ease-in-out";
      signupForm.style.display = "block";
    },
  },
};