<template>
  <header>
    <img src="../assets/img/icon-left-font-monochrome-black.png" alt="logo groupomania" />
  </header>
  <SignupForm />
</template>

<script>
import SignupForm from "../components/SignupForm";
export default {
  name: "signup",
  components: {
    SignupForm,
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  img {
    width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  img {
    width: 100%;
  }
}
</style>