<template>
  <header>
    <img
      src="../assets/img/icon-left-font-monochrome-black.png"
      alt="logo groupomania"
    />
  </header>
  <body>
    <LoginForm />
  </body>
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