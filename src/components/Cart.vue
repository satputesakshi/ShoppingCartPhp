<template>
  <div class="d-flex cart-outer-div">
    <Header />
    <div class="cart-body">
      <div v-if="totalPrice !== 0" class="container mb-5">
        <h4 class="my-4 my-cart">My Cart</h4>
        <div class="d-flex my-3" style="justify-content: space-between">
          <h4 class="fw-600" style="color: white">Summary</h4>
          <h4 class="fw-600" style="margin-right: 48% ;color: white">Cart</h4>
        </div>
        <div class="d-flex">
          <div v-show="totalPrice !== 0" class="row" style="width: 50%">
            <div class="col-md-4">
              <h6>Total:</h6>
              <h6>Promo Code:</h6>
              <h6>Shipping:</h6>
              <div class="my-3 line w-120"></div>
              <h6>Subtotal:</h6>
            </div>
            <div class="col-md-4">
              <h6>CAD {{ totalPrice }}</h6>
              <h6>Jordan10</h6>
              <h6>CAD 50</h6>
              <div class="my-3 line w-60"></div>
              <h6>CAD {{ totalPrice + 50 }}</h6>
            </div>
          </div>
          <div class="row" style="width: 50%">
            <div style="max-width: 70%" class="col-md-12">
              <ul style="padding: 0">
                <li
                  v-for="items in cartItems"
                  :key="items.id"
                  style="list-style: none"
                >
                  <div class="cart-items">
                    <img
                      :src="items.produrl"
                      width="50px"
                      height="50px"
                      style="border-radius: 50%"
                    />
                    <h6 class="mt-15">{{ items.prodName }}</h6>
                    <div class="d-flex mt-10">
                      <button
                        v-on:click="removeItem(items)"
                        class="add"
                        type="button"
                      >
                        -
                      </button>
                      <span class="cart-quantity">{{ items.quantity }}</span>
                      <button
                        v-on:click="addToCart(items)"
                        class="remove"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <h6 class="mt-15">{{ items.prodPrice * items.quantity }}</h6>
                  </div>
                  <div class="line"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-end"
          style="width: 80%; margin-top: 2%"
        >
          <button v-on:click="checkout" class="btn btn-primary" type="button">
            {{ isLoggedIn ? "Checkout" : "Login" }}
          </button>
        </div>
      </div>
      <div v-else class="container my-5" style="text-align: center">
        <img src="../assets/cart1.png" width="100px" />
        <div class="mt-4">
          <h4 class="orange-red fw-600">Your cart is empty</h4>
          <h5 class="darkblue fw-600">
            You can go to home page to view more items.
          </h5>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";
import swal from "sweetalert";

export default {
  name: "Cart",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      item: 0,
    };
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("addToCart", item);
    },
    removeItem(item) {
      this.$store.dispatch("removeItem", item);
    },
    checkout() {
      if (this.isLoggedIn) {
        swal("Good job!", "Your order is placed successfully!", "success").then(
          (value) => {
            //window.location.href = "/cart";
            this.$store.commit("resetCart")
            this.$router.push('/cart')
          }
        );
      }
      else{
        this.$router.push({ path: '/login', query: { redirect: '/cart' }})
      }
    },
  },
  computed: {
    cartItems() {
      return this.$store.state.cartItems;
    },
    totalPrice() {
      let price = 0;
      this.$store.state.cartItems.map((el) => {
        console.log();
        price += this.$store.quantity * this.$store.prodPrice;
       // price += el["items.quantity"] * el["items.prodPrice"];
      });
      return price;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-outer-div {
  flex-direction: column;
  height: 100vh;
}
.cart-body {
  background: rgb(39, 38, 38);
  flex: 1;
  overflow-y: auto;
}
.cart-quantity {
  display: inline-block;
  padding: 3px 6px;
  width: 46px;
  height: 28px;
  border-radius: 2px;
  background-color: #fff;
  margin: 0 5px;
  text-align: center;
}
.cart-items {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
}
.my-cart {
  color: white;
  font-weight: 600;
}
input[type="text"] {
  border: none;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  vertical-align: middle;
  text-align: center;
  outline: none;
}
.fw-600 {
  font-weight: 600;
}
.line {
  height: 1px;
  border-bottom: 1px solid white;
}
.w-120 {
  width: 120%;
}
.w-60 {
  width: 60%;
}
.add,
.remove {
  width: 28px;
  height: 28px;
  background: linear-gradient(#fff, #f9f9f9);
  border: 1px solid #c2c2c2;
  cursor: pointer;
  font-size: 16px;
  border-radius: 7px;
  padding-top: 1px;
  outline: none;
}
.mt-10 {
  margin-top: 10px;
}
.mt-15 {
  margin-top: 15px;
}
.orange-red {
  color: white;
}
.darkblue {
  color: white;
}
.col-md-4 {
  color: white;
}
</style>
