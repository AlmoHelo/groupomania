<template>
  <footer>
    <ul>
      <li>
        <a href="#"><i class="fab fa-facebook-f"></i></a>
      </li>
      <li>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </li>
      <li>
        <a href="mailto:groupomania@gmail.com"
          ><i class="far fa-envelope"></i
        ></a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "footer",
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  margin-top: 60px;
  & ul {
    display: flex;
    justify-content: center;
    margin: 0;
    & li {
      font-size: 50px;
      margin: 10px 40px;
      & a {
          color: white;
      }
    }
  }
}
@media screen and (max-width: 767px) {
    footer{
        & ul {
            flex-direction: column;
        }
    }
}
</style>
