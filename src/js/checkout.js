import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkout-process.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", () => myCheckout.calculateOrderTotal());

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  // Check form validity (no empty input fields):
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    myCheckout.checkout();
  }
});
