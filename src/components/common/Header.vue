<template>
  <header>
    <div class="header">
      <div v-on:click="goTo('/')" class="logo">
        <img
          src="../../assets/logo.png"
          width="80px"
          height="80px"
          style="margin-left: 10px"
        />
        <h4 class="brand">Jordan Kingdom</h4>
      </div>
      <div
        class="d-flex"
        style="
          width: 300px;
          justify-content: space-evenly;
          padding-top: 1px;
          align-self: center;
        "
      >
        <font-awesome-icon
          v-on:click="goTo('cart')"
          icon="shopping-cart"
          size="2x"
        />
        <span class="cart-count">{{ count }}</span>

        <h5 v-if="!isLoggedIn" class="login" @click="goTo('login')">Login</h5>
        <h5 v-if="isLoggedIn" class="login">{{ username }}</h5>
        <h5 v-if="isLoggedIn" class="login" @click="logout">Logout</h5>

        <!-- <h5 class="register">Sign Up</h5> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goTo(page) {
      //page === "home" ? this.$router.push("/") : this.$router.push("/cart");
      this.$router.push(page);
    },
    logout() {
      this.$store.commit("setisLoggedIn", false);
      this.$router.push("/");
    },
  },
  computed: {
    count() {
      return this.$store.state.cartItemCount;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 80px;
  background: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-self: center;
}
.logo {
  display: flex;
  margin-left: 15px;
  padding: 6px;
  cursor: pointer;
  align-self: center;
}
.brand {
  color: black;
  font-weight: 600;
  margin-top: 27px;
}
.cart-count {
  font-size: 15px;
  color: #d4570cf2;
  padding: 0 5px;
  margin-left: -35px;
  background: white;
  height: 20px;
  border-radius: 50%;
  width: 20px;
}
.cart-icon {
  line-height: 45px;
  font-size: 24px;
  color: #2aa5a0;
  cursor: pointer;
}
.login,
.register {
  font-weight: 600;
  margin-top: 10px;
}
</style>
