import DB from "./services/storage/DB.js";
import Auth0 from "./auth/Auth.js";

console.log("DB", DB);
const Auth = await Auth0();

console.log("Auth", Auth);
const isAuthenticated = await Auth.isAuthenticated();
console.log("isAuthenticated", isAuthenticated);
console.log("User > ", await Auth.getUser());

// document.getElementById("btn-login").onclick = login(Auth);
// document.getElementById("btn-logout").onclick = logout(Auth);
