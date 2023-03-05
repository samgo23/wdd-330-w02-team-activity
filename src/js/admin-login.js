import { loadHeaderFooter } from "../js/utils.mjs";
import Admin from "../js/Admin.mjs";

loadHeaderFooter();
const login = new Admin();
login.showLogin();
