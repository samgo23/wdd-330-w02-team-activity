import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class Admin {
    constructor(outputSelector) {
      this.mainElement = document.querySelector(outputSelector);
      this.token = null;
      this.services = new ExternalServices();
    }

      async login(user, next) {
      // I built the login method with a callback: next. 
      // This makes it much more flexible...
      // there could be many different things the user wants to do after logging in...
      // this allows us that flexibility without having to write a bunch of login methods
      try {
        this.token = await this.services.loginRequest(user);
        next()
      } 
      catch(err) {
        // remember this from before?
        alertMessage(err.message.message);
      }
    };
}
function showLogin() {
document.querySelector("#loginButton").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    this.login({ email, password })}); }