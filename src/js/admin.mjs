import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class Admin {
    constructor() {
        this.token = null;
        this.services = new ExternalServices();
    }

    async login (creds, next){
        try {
            this.token = await this.services.loginRequest(creds);
            next()
        } 
        catch(err) {
          alertMessage(err.message.message);
        }
    }

    async showLogin() {
        // Add HTML for the login form:
        document.querySelector(".Login").innerHTML = loginFormHTML();            

        // Listen for a click on the button to call the login method:
        document.querySelector("#login-submit").addEventListener("click", (e) => { 
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({email, password}) });
    }

    async showOrders() {
        try {
            // Retrieve token:
            const orders = await this.services.getOrders(this.token);

            // Add orders HTML template:
            document.querySelector(".Orders").innerHTML = orderHTML();

            document.querySelector("#orders tbody").innerHTML = orders.map(
                (order) =>
                `<tr>
                    <td>${order.id}</td>
                    <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
                    <td>${order.items.length}</td>
                    <td>${order.orderTotal}</td>
                </tr>`
            )
            .join("");
        } catch (err) {
            console.log(err);
        }
    }
}

// Create the login form HTML template:
function loginFormHTML() {
    return `<h2>Log In</h2>
            <form id="login-form name="login">
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" required>

                <label for="password">Password:</label>
                <input type="text" name="password" id="password" required>

                <button type="submit" id="login-submit">Log In</button>
            </form>`;
}

// Create the orders HTML template:
function orderHTML() {
    return `<h2>Current Oreders </h2>
            <table id="orders>
                <thead>
                    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
                </thead>
                <tbody class="order-body"></tbody>
            </table>`;
}