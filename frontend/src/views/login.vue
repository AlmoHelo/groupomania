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
