<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <div class="container mb-5">
        <h4 class="my-4 fw-600 d-blue">Best Sellers</h4>
        <div class="row">
          <div
            v-for="items in topRated"
            :key="items.id"
            v-on:click="productDetails(items)"
            class="col-md-4 pointer"
          >
            <img :src="items.produrl" width="260px" height="290px" style="border-radius: 15px" />
            
            <h5 class="fw-600 black">{{items.prodName}}</h5>
          </div>
        </div>
        <!--  -->
        <h4 class="my-4 fw-600 d-blue">Best Finds</h4>
        <div class="row">
          <div v-for="items in allCategories" :key="items.id" v-on:click="productDetails(items)" class="col-md-4 pointer">
            <img :src="items.produrl" width="260px" height="290px" style="border-radius: 15px" />
            
            <h5 class="fw-600 black">{{items.prodName}}</h5>
          </div>
        </div>
        <!--  -->
        <h4 class="my-4 fw-600 d-blue">Essentials</h4>
        <div class="row">
          <div v-for="items in essentials" :key="items.id" v-on:click="productDetails(items)" class="col-md-4 pointer">
            <img :src="items.produrl" width="260px" height="290px" style="border-radius: 15px" />
            
            <h5 class="fw-600 black">{{items.prodName}}</h5>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";

export default {
  name: "Dashboard",
  components: {
    Header,
    Footer
  },
  computed: {
    topRated() {
      return this.$store.state.bestsellers;
    },
    allCategories() {
      return this.$store.state.bestFinds;
    },
    essentials() {
      return this.$store.state.essentials;
    }
  },
  mounted(){
    this.$store.dispatch("fetchProducts")
  },
  methods: {
    productDetails(item) {
      this.$router.push({ name: "product-details", params: item });
    }
  }
};
</script>

<!-- CSS Style -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  background: rgb(39, 38, 38);
  flex: 1;
  overflow-y: auto;
}
.fw-600 {
  font-weight: 600;
  margin-top: 20px;
  align-content: center;
}
.d-blue {
  color: dodgerblue;
}
.black {
  color: white;
}
.pointer {
  cursor: pointer;
}
/* .pointer:hover {
  background: rgb(99, 100, 100);
  border: 1px solid rgb(1, 49, 97);
  box-shadow: 0 8px 16px 0 rgba(1, 48, 94, 0.6);
} */
</style>
