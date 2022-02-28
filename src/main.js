// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
// ROUTES
import VueRouter from "vue-router";
import Routes from "./routes";
import AwesomeVueStarRating from "awesome-vue-star-rating"
// STORE
import { store } from "./store/store";


// FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// BOOTSTRAP
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// BOOTSTRAP
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// ROUTER
Vue.use(VueRouter);
//FONT AWESOME
library.add(faShoppingCart);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

/* eslint-disable no-new */
// new Vue({
//   el: "#app",
//   router: router,
//   store: store,
//   components: { App },
//   template: "<App/>"
// });

new Vue({
  el: "#app",
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
