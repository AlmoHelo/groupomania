
  el: "#logPage",
  data() {
    return {
      emailLog: "",
      passwordLog: "",
      message: "",
    };
  },
  methods: {
    envoie: function () {
      //let myEmail = document.getElementById("emailLog").value;
      //let myPassword = document.getElementById("passwordLog").value;
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
            this.$localStorage.setItem("user", userObj);
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
      }
    },

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