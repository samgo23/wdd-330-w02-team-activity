import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs";



function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
    <p class="cart-card__quantity">Quantity: <input min=1 type="number" value="${item.Quantity}" class="cart-quantity-input"></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.selector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);

    if (cartItems != null) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.selector).innerHTML = htmlItems.join("");
      document.querySelector(".list-total").innerText += ` $${this.total}`;
      this.changeQuantity();
      // onCartPageLoad();
    } else {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerText =
        "There are currently no items in the cart. Go back to the store to select new items.";
      div.appendChild(p);
      document
        .querySelector(".products")
        .insertBefore(div, document.querySelector(this.selector));
    }
  }
// changes shopping cart item quantities
  changeQuantity() {
    const inputElements = document.querySelectorAll(".cart-quantity-input");
    inputElements.forEach((input, index) => {
      input.addEventListener("change", (event) => {
        const newQuantity = event.target.value;
        const cartItems = getLocalStorage(this.key);
        cartItems[index].Quantity = newQuantity;
        setLocalStorage(this.key, cartItems);
      });
    });
  }

  removeFromCart() {
    const productList = document.querySelector(".product-list");
    productList.addEventListener("click", (event) => {
      if (event.target.matches(".remove-item")) {
        const itemId = event.target.dataset.id;
        const cartItems = getLocalStorage("so-cart");
        const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);
        localStorage.setItem("so-cart", JSON.stringify(updatedCartItems));
        // renderCartContents();
    }
  });
  }
  
}
// // function onCartPageLoad() {
//   // Get cart items from local storage
//   let cartItems = getLocalStorage("so-cart");
  
//   // Check if there are any items in the cart
//   if (cartItems && cartItems.length > 0) {
//     // Show the cart footer element
//     qs(".cart-footer").classList.remove("hide");

//     // Calculate total of cart items
//     let total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

//     // Create HTML to display total
//     let totalHTML = `<p class="cart-total">Total: $${total}</p>`;

//     // Insert HTML into element
//     qs(".cart-footer").innerHTML = totalHTML;
//   }
// }