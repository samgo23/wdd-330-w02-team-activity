import { getLocalStorage } from "./utils.mjs";
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

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
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
        // calculate and display the total amount of the items in the cart, and the number of items.
        let summaryElement = document.querySelector('#cartSubtotal'
        );
        const itemNumElement = document.querySelector("#num-items"
        );
        itemNumElement.innerText = this.list.length;
        let amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = '$' + this.itemTotal;
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
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
        );
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
        } catch (err) {
          console.log(err);
        }
    }
}