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
  margin: 100px 0 60px 0;
  & ul {
    display: flex;
    justify-content: center;
    margin: 0;
    & li {
      font-size: 50px;
      margin: 10px 40px;
      & a {
          color: black;
      }
    }
  }
}
@media screen and (max-width: 767px) {
    footer{
      margin: 60px 0 40px 0;
        & ul {
            flex-direction: column;
            & li{
              font-size: 30px;
            }
        }
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    footer{
      margin: 80px 0 50px 0;
        & ul {
            & li{
              font-size: 40px;
            }
        }
    }
}
</style>
