import { qs, getLocalStorage } from "./utils.mjs";



renderCartContents();
onCartPageLoad();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}


function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function onCartPageLoad() {
  // Get cart items from local storage
  let cartItems = getLocalStorage("so-cart");
  
  // Check if there are any items in the cart
  if (cartItems && cartItems.length > 0) {
    // Show the cart footer element
    qs(".cart-footer").classList.remove("hide");

    // Calculate total of cart items
    let total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    // Create HTML to display total
    let totalHTML = `<p class="cart-total">Total: $${total}</p>`;

    // Insert HTML into element
    qs(".cart-footer").innerHTML = totalHTML;
  }
}


