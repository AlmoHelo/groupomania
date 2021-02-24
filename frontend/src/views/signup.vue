<template>
  <header>
    <img src="../assets/img/logo-white.png" alt="logo groupomania" />
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
