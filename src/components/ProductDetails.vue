<template>
  <div class="d-flex product-details-outer">
    <Header />
    <div class="product-details">
      <div class="container mb-5">
        <div class="container mb-5">
          <h4 class="my-4 fw-600">Add Item to cart</h4>
          <div class="row">
            <div class="col-md-4" style="cursor: pointer">
              <img
                :src="details.produrl"
                width="300px"
                height="300px"
                style="border-radius: 15px"
              />
            </div>
            <div class="col-md-4" style="color: white">
              <h5 class="my-4 fw-600">Name: {{ details.prodName }}</h5>
              <h5 class="my-4 fw-600">Price: {{ details.prodPrice }}</h5>
              <h5 class="my-4 fw-600">Description: {{ details.prodDesc }}</h5>
              <h5 class="my-4 fw-600">Rating: {{ details.rate }} *</h5>
              <div class="button">
                <button
                  v-on:click="goToCart"
                  class="btn btn-primary"
                  style="margin: 5px"
                >
                  Go to Cart
                </button>
                <button
                  v-on:click="addToCart"
                  class="btn btn-success"
                  style="margin: 5px"
                >
                  Add Item
                </button>
                <button
                  v-on:click="removeItem"
                  class="btn btn-danger"
                  style="margin: 5px"
                >
                  Remove Item
                </button>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <ProductStarRating  :productId="details.id"/>
      <br/>
      <div class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-8">
           <div class="card p-3" v-for="review in reviews" :key="review.reviewId">
              
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <h4>{{review.custName}}</h4> </div> <small>{{review.created}}</small>
                </div>
                <hr>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> {{review.comment}}  </div>
                    <div class="icons align-items-center"> <star-rating :rating= "parseInt(review.rate)" :read-only= "true"/></div>
                </div>
            </div>
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
import ProductStarRating from "./ProductStarRating";
import StarRating from 'vue-star-rating'
export default {
  name: "ProductDetails",
  components: {
    Header,
    Footer,
    ProductStarRating,
    StarRating
  },
  data() {
    return {
      details: this.$route.params,
    };
  },
  methods: {
    goToCart() {
      this.$router.push("/cart");
    },
    addToCart() {
      // this.$store.commit("addToCart");
      this.$store.dispatch("addToCart", this.details);
      console.log("this.$store", this.$store.state.cartItems);
    },
    removeItem() {
      // this.$store.commit("removeItem");
      this.$store.dispatch("removeItem", this.details);
    },
    
  },
  created() {
    if (this.$route.params.id !== undefined) {
      localStorage.setItem("details", JSON.stringify(this.$route.params));
    }
  },
  reviewform() {
    this.$reviewform();
  },
  mounted() {
    this.details = JSON.parse(localStorage.getItem("details"));
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchComments")
  },
  computed: {
     reviews(){
       console.log(this.details);
      return this.$store.state.reviews;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-details-outer {
  flex-direction: column;
  height: 100vh;
}
.product-details {
  background: rgb(39, 38, 38);
  flex: 1;
  overflow-y: auto;
}
.fw-600 {
  font-weight: 600;
  color: white;
}
.button {
  margin: 2px;
}
</style>
