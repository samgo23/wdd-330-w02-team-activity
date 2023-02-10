import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
      this.changeQuantity();
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
}
