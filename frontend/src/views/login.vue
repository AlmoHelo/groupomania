<template>
  <header>
    <img src="../assets/img/logo-white.png" alt="logo groupomania" />
  </header>
  <LoginForm />
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "login",
  components: {
    LoginForm,
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