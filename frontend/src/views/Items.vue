<template>
  <headerAll />
  <div class="articles">
    <div>
      <ul>
        <li>
          <a @click="viewBest" id="linkBest"
            ><i class="fas fa-fire-alt"></i> Best
          </a>
        </li>
        <li>
          <a><i class="fas fa-angle-right"></i> Nouveauté</a>
        </li>
        <li>
          <a @click="viewAll" id="linkAll"><i class="fas fa-globe"></i> Tous</a>
        </li>
      </ul>
    </div>
    <div id="itemAllPage"><itemAll /></div>
    <div id="bestItemPage"><bestItems /></div>
  </div>
  <footerAll />
</template>

<script>
import headerAll from "../components/headerAll";
import itemAll from "../components/itemAll.vue";
import bestItems from "../components/bestItems.vue";
import footerAll from "../components/footerAll";

export default {
  name: "Items",
  components: { headerAll, itemAll, bestItems, footerAll },
  methods: {
    viewAll: function () {
      let myBest = document.getElementById("bestItemPage");
      let myAll = document.getElementById("itemAllPage");
      myBest.style.display = "none";
      myAll.style.display = "flex";

      let myBestLink = document.getElementById("linkBest");
      myBestLink.style.backgroundColor = "transparent";
      myBestLink.style.border = "none";

      let myAllLink = document.getElementById("linkAll");
      myAllLink.style.border = "1px solid #9da5ad";
      myAllLink.style.backgroundColor = "#9da5ad";
      myAllLink.style.borderRadius = "35px";
      myAllLink.style.padding = "6px";
    },
    viewBest: function () {
      let myBest = document.getElementById("bestItemPage");
      let myAll = document.getElementById("itemAllPage");
      myBest.style.display = "flex";
      myAll.style.display = "none";

      let myBestLink = document.getElementById("linkBest");
      myBestLink.style.border = "1px solid #9da5ad";
      myBestLink.style.backgroundColor = "#9da5ad";
      myBestLink.style.borderRadius = "35px";
      myBestLink.style.padding = "6px";

      let myAllLink = document.getElementById("linkAll");
      myAllLink.style.backgroundColor = "transparent";
      myAllLink.style.border = "none";
    },
  },
};
</script>

<style lang="scss" scoped>
.articles div ul {
  display: flex;
  justify-content: space-around;
  border: 1px solid #5a85b1;
  width: 40%;
  margin: auto;
  margin-top: 40px;
  padding: 10px;
  & a {
    &:hover {
      border: 1px solid #9da5ad;
      background-color: #9da5ad;
      padding: 6px;
      border-radius: 35px;
    }
  }
}
#linkBest {
  border: 1px solid #9da5ad;
  background-color: #9da5ad;
  padding: 6px;
  border-radius: 35px;
  &:hover {
    border: 1px solid #9da5ad;
    background-color: #9da5ad;
    padding: 6px;
    border-radius: 35px;
  }
}
#itemAllPage {
  display: none;
}

@media screen and (max-width: 767px) {
  div {
    display: flex;
    flex-direction: column-reverse;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  div {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>