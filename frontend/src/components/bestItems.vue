<template>
  <section>
    <h2>Top 3</h2>
    <div class="allBest">
      {{ errorMessage }}
      <div class="article" v-for="(mess, index) in msg" :key="mess.idMessages">
        <div class="headArt">
          <a @click="viewComments(mess.id)" class="myHead">
            <p class="profilArt">
              <img
                v-bind:src="mess.pictureProfil"
                class="myImgProfil"
                v-if="mess.pictureProfil != null"
              />{{ mess.pseudoUser }}
            </p>
            <p class="dateArt">{{ mess.date }}</p>
          </a>
          <div v-if="userAdmin == 1">
            <a @click="deleteIsAdmin(mess.id)" id="reportItem"
              ><i class="fas fa-times"></i
            ></a>
          </div>
        </div>

        <a @click="viewComments(mess.id)">
          <div class="descrip">
            <a
              v-bind:href="'http://localhost:3000/images/' + mess.imageURL"
              class="myLinkPict"
              ><img
                v-bind:src="'http://localhost:3000/images/' + mess.imageURL"
                class="myImg"
                title="Cliquer pour agrandir"
                v-if="mess.imageURL != null"
            /></a>
            <p class="texte" id="texte">{{ mess.description }}</p>
          </div>
        </a>
        <div class="footArt">
          <div class="like">
            <a
              ><i
                class="far fa-thumbs-up"
                id="good"
                v-on:click="onLike(mess.id, index)"
              ></i></a
            >{{ mess.likes }}

            <a v-on:click="onDislike(mess.id, index)"
              ><i class="far fa-thumbs-down" id="bad"></i></a
            >{{ mess.dislikes }}
          </div>
          <a class="commAccueil" @click="viewComments(mess.id)"
            ><i class="fas fa-comment-dots"></i>
            <p class="nbcomm">
              {{ mess.nbComm }} Commentaire<span v-if="mess.nbComm > 1">s</span>
            </p></a
          >
          <a
            class="signaler"
            @click="report(mess.id)"
            v-if="mess.userId != userId"
            ><i class="far fa-flag"></i><span>Signaler ce commentaire</span></a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DATE_FORMAT } from "../service/utility";
import { SEARCH_PICTURE } from "../service/utility";
import axios from "axios";
export default {
  name: "bestItem",
  data() {
    return {
      message: "",
      msg: "",
      errorMessage: "",
      userAdmin: "",
      userId: "",
    };
  },
  methods: {
    onLike: function (messId, indexI) {
      let valueLike = "like";
      let idOneItem = messId;
      console.log(document.getElementById("good"));
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            valueLike: valueLike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          if (response.data.addLike) {
            this.msg[indexI].likes++;
            this.msg[indexI].dislikes--;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDislike: function (messId, indexI) {
      let valueLike = "dislike";
      let idOneItem = messId;
      console.log(indexI);
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          "http://localhost:3000/api/items/" + user.userId + "/like",
          {
            userId: user.userId,
            email: user.email,
            valueLike: valueLike,
            idItem: idOneItem,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          if (response.data.addLike == false) {
            this.msg[indexI].dislikes++;
            this.msg[indexI].likes--;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    viewComments: function (messId) {
      localStorage.setItem("commentOneItem", messId);
      window.location.href = "http://localhost:8080/comment";
    },
    report: function (messId) {
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          `http://localhost:3000/api/report/`,
          { itemId: messId, userId: user.userId },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteIsAdmin: function (messId) {
      console.log(messId);
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .delete(`http://localhost:3000/api/items/${messId}`, {
          headers: {
            authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/item";
        })
        .catch((error) => {
          alert("Une erreur s'est produite. Veuillez réessayer la page");
          console.log(error);
        });
    },
  },
  mounted() {
    //Appel à l'api pour l'affichage du top 3
    let user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.userId;
    this.userAdmin = user.admin;
    axios
      .get("http://localhost:3000/api/items/", {
        headers: {
          authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.msg = response.data.map((element) => {
          element.date = DATE_FORMAT(element.date);
          return element;
        });

        this.msg = response.data.map((element) => {
          if (element.imageURL != null) {
            element.imageURL = SEARCH_PICTURE(element.imageURL);
            return element;
          }
        });

        let test = response.data;
        test.sort(function (a, b) {
          //trie tableau par les likes
          return a.likes - b.likes;
        });
        test.reverse(); //mets du plus grand au plus petit

        for (let i = 0; i < test.length && i < 3; i++) {
          //récupère les 3 premiers
          let myFavoriteItem = [];
          myFavoriteItem[0] = test[0];
          myFavoriteItem[1] = test[1];
          myFavoriteItem[2] = test[2];
          localStorage.setItem("bestItem", JSON.stringify(myFavoriteItem));
        }
        this.msg = JSON.parse(localStorage.getItem("bestItem"));
      })
      .catch((error) => {
        console.log(error);
        this.errorMessage =
          "Une erreur s'est produite. Veuillez recharger la page";
      });
  },
};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  width: 90%;
  max-height: 100%;
  margin: auto;
  margin-top: 10px;
  box-shadow: inherit;
  background-color: white;
}
.descrip {
  display: flex;
  align-items: center;
  & .myLinkPict {
    margin: 10px 0px 10px 10%;
    max-width: 40%;
  }
  & .myImg {
    border-radius: 5px;
    max-width: 100%;
    max-height: 150px;
  }
  & .texte {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
.article {
  border: 1px solid #d2d2d2c7;
  border-radius: 5px;
  background-color: #dae0e6;
  margin: 20px;
  box-shadow: 0 3px 5px grey;
  & .headArt {
    align-items: center;
    & .dateArt {
      margin-left: 30%;
    }
    & .myHead {
      width: 90%;
      margin-left: 10px;
      display: flex;
      align-items: center;
      & .profilArt {
        display: flex;
        align-items: center;
        & .myImgProfil {
          max-width: 80px;
          max-height: 80px;
          margin-right: 20px;
          border-radius: 40px;
        }
      }
    }
  }
  & .footArt {
    border-top: 1px solid #b6b3b39d;
    padding: 15px;
  }
}
@media screen and (max-width: 767px) {
  section {
    padding: 10px;
    & h2 {
      font-size: 15px;
    }
  }
  .descrip {
    flex-direction: column;
    & .myLinkPict {
      margin: auto;
      margin-top: 10px;
      max-width: 100%;
    }
    & .myImg {
      max-height: 20%;
    }
    & .texte {
      margin-top: 0px;
      margin-bottom: 10px;
    }
  }
  .article {
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    & .headArt {
      & .myHead {
        & .profilArt {
          & .myImgProfil {
            max-width: 40px;
            max-height: 40px;
            margin-right: 10px;
          }
        }
        & .dateArt {
          width: 30%;
        }
      }
    }
    & .footArt {
      justify-content: space-between;
      padding: 10px;
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  section {
    & .allBest {
      margin: 10px;
    }
    & .article {
      font-size: 14px;
      & .headArt {
        & .myHead {
          & .profilArt {
            & .myImgProfil {
              max-width: 50px;
              max-height: 50px;
              margin-right: 10px;
            }
          }
          & .dateArt {
            width: 40%;
          }
        }
      }
      & .descrip {
        & .myLinkPict {
          margin: auto;
          margin: 5px;
          max-width: 50%;
          & .myImg {
            max-height: 220px;
          }
        }
        & .texte {
          height: 50px;
        }
      }
      & .footArt {
        justify-content: space-between;
      }
    }
  }
}
</style>