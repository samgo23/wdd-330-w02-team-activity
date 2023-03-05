import { getLocalStorage } from "./utils.mjs";

export default class ExternalServices {
    constructor(outputselector) {
        this.mainElement = document.querySelector(outputSelector);
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

    showLogin() {
        // Add HTML for the login form:
        document.querySelector(".Login").innerHTML = loginFormHTML();            

        // Listen for a click on the button to call the login method:
        document.querySelector("#login-submit").addEventListener("click", (e) => { 
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({email, password}) });
    }
}

function loginFormHTML() {
    return `<form id="login-form name="login">
                <label for="email">E-mail:</label>
                <input type="email" name="email" id="email" required>

                <label for="password">Password:</label>
                <input type="text" name="password" id="password" required>

                <button type="submit" id="login-submit">Log In</button>
            </form>`;
}