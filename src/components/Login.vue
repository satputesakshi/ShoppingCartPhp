<template>
  <div class="wrapper">
    <Header />

    <main class="my-auto h-100">
      <div class="card align-items-center">
        <div class="card-header w-75 align-items-center">
          <form @submit.prevent="login">
            <h2 class="h3 mb-3 fw-normal text-center">Please sign in</h2>
            <div v-if="errorMessage!= ''" class="alert alert-danger" role="alert">
  {{errorMessage}}
</div>
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email address"
                v-model="email"
                required
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>

            <div class="checkbox mb-3">
              <label
                ><input type="checkbox" value="remember-me" /> Remember
                me</label
              >
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <p class="mt-3 mb-3 text-muted text-center">© 2020–2026</p>
    </main>
  </div>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";
export default {
  name: "Dashboard",
  components: {
    Header,
    Footer,
  },
  methods: {
    login() {
        this.errorMessage="";
        if(this.email=="sakshi@gmail.com" && this.password=="admin123"){
        this.$store.commit("setisLoggedIn",true)
        
        this.$router.push(this.$route.query.redirect || '/')
        } 
        else{
            this.errorMessage="Please enter correct credentials";
        }
    },
  },
  data() {
    return {
      //valid: true,
      errorMessage: "",
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.form-signin{
 
}
</style>