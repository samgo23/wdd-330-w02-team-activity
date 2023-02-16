import {renderCartContents} from "/js/ShoppingCart.js";

export default class CheckoutProcess {
constructor(key, outputSelector){
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
}

init(){
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
}

calculateItemSummary(){
    let subtotal = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
}

calculateOrderTotal(){

this.displayOrderTotals();
}

displayOrderTotals(){

}

}