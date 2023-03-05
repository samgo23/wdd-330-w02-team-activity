import { getLocalStorage } from "./utils.mjs";

export default class ExternalServices {
    constructor() {
      
    }
    async init () {}

     login (){
        
    }

    showLogin() {
        document.querySelector(".Login").innerHTML =
            `<form id="login-form name="login">
                <label for="email-input">E-mail:</label>
                <input type="text" name="email-input" id="email" required />

                <label for="password-input">Password:</label>
                <input type="text" name="password-input" id="password" required />

                <button type="submit" id="login-submit">Log In</button>
            </form>`;

        // listening for click on the button:
        document.querySelector("#login-submit").addEventListener("click", (e) => {
            e.preventDefault();
            // Check form validity (no empty input fields):
            var myForm = document.forms[0];
            var chk_status = myForm.checkValidity();
            myForm.reportValidity();
            if (chk_status) {
            myCheckout.checkout();
            }
        });
    }
}