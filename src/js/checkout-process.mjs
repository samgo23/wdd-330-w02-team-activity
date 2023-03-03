import { getLocalStorage, alertMessage, setLocalStorage , removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


const services = new ExternalServices();
function formDataToJSON(form) {
    const formData = new FormData(form),
    convertedJSON = {};

    formData.forEach(function (value, key) {
    convertedJSON[key] = value;
    });

  return convertedJSON;
}

// Take the items currently stored in the cart (localStorage) and returns
// them in a simplified form:
function packageItems(items) {
    const simplifiedItems = items.map((item) => {

      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess {
constructor(key){
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
}

    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
        this.calculateOrderTotal();
    }

    calculateItemSummary(){
        // calculate and display the total amount of the items in the cart, and the number of items.
        let summaryElement = document.querySelector("#cartSubtotal");
        const itemNumElement = document.querySelector("#num-items");
        itemNumElement.innerText = this.list.length;
        let amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + parseFloat(this.itemTotal).toFixed(2);
    }

    calculateOrderTotal(){
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.shipping) +
          parseFloat(this.tax)
        ).toFixed(2);
        
        // display the totals.
        this.displayOrderTotals();
       
    }

    displayOrderTotals(){
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");
        const orderTotal = document.querySelector("#orderTotal");
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;

    }
    async checkout() {
        const formElement = document.forms["checkout"];
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
          //setLocalStorage("so-cart", []);
          localStorage.clear();
          location.assign("/checkout/success.html");
        } catch (err) {
          // Get rid of pre-existing alerts:
          removeAllAlerts();
          for (let message in err.message) {
            alertMessage(err.message[message]);
          }
          console.log(err);
        }
    }
}