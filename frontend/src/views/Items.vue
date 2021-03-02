<template>
  <headerAll />
  <div>
    <itemAll />
    <bestItems />
  </div>
</template>

<script>
import headerAll from "../components/headerAll";
import itemAll from "../components/itemAll.vue";
import bestItems from "../components/bestItems.vue";

export default {
  name: "Items",
  components: { headerAll, itemAll, bestItems },
};
</script>

<style lang="scss" scoped>
div{
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 767px) {
  div{
    display: flex;
    flex-direction: column-reverse;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  div{
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>