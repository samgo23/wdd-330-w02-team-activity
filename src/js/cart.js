import ShoppingCart from "./ShoppingCart.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
// onCartPageLoad();
