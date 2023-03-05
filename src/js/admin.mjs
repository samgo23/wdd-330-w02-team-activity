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
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" required>

                <label for="password">Password:</label>
                <input type="text" name="password" id="password" required>

                <button type="submit" id="login-submit">Log In</button>
            </form>`;

        // listening for click on the button to call the login method:
        document.querySelector("#login-submit").addEventListener("click", (e) => { e.login() });
    }
}