import Dashboard from "./components/Dashboard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default [
  { path: "/", component: Dashboard },
  { path: "/product-details", name: "product-details", component: ProductDetails },
  { path: "/cart", component: Cart },
  { path: "/about-us", component: AboutUs },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];
