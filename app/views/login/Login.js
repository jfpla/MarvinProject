/** Transitions **/
import { loadCSS, loadHTML } from "../View.js";
import { login } from "../../auth/Auth.js";

const TransitionLoginSetUp = (template, auth) => {
  const loginElement = template.querySelector(".login");
  console.log(loginElement);

  const showLoginBoxGhost = (event) => {
    const loginElement = event.target;
    loginElement.style.setProperty("--shadowBGColor", "rgba(255, 255, 255)");
    loginElement.style.setProperty("--shadowScale", "200");
  };

  const loginTransition = (event) => {
    const loginElement = event.target;

    loginElement.classList.add("fade");
    template.querySelector(".disabled").classList.add("fade");
    loginElement.addEventListener("transitionend", showLoginBoxGhost, {
      once: true,
    });
  };

  loginElement.addEventListener("click", (e) => {
    loginTransition(e);
    login(auth);
  });

  return template;
};

const TransitionLogoutSetUp = (template) => {
  const logoutElement = template.querySelector(".logout");
  console.log(logoutElement);
  const logoutTransition = () => {
    console.log("logoutTransition");
    // TransitionToggleLogin();
  };

  logoutElement.addEventListener("click", logoutTransition);

  return template;
};

const TransitionToggleLogin = (template, activateLogin = true) => {
  const loginLayer = template.querySelector(".bg-image > div:first-of-type");
  const loginLink = template.querySelector(".bg-image > a:first-of-type");

  const logoutLayer = template.querySelector(".bg-image > div:last-of-type");
  const logoutLink = template.querySelector(".bg-image > a:last-of-type");

  // const isLoginLinkHidden = loginLink.classList.contains("hidden");

  loginLayer.className = "";
  loginLink.className = "";
  logoutLayer.className = "";
  logoutLink.className = "";

  if (activateLogin) {
    loginLayer.classList.add("box", "hidden");
    loginLink.classList.add("login", "box", "enabled");

    logoutLayer.classList.add("box", "disabled");
    logoutLink.classList.add("logout", "box", "hidden");
  } else {
    logoutLayer.classList.add("box", "hidden");
    logoutLink.classList.add("logout", "box", "enabled");

    loginLayer.classList.add("box", "disabled");
    loginLink.classList.add("login", "box", "hidden");
  }
  return template;
};

/* LoginView */
/**
 *
 * @param auth
 * @return {Promise<Element>}
 * @constructor
 */
const LoadLoginView = async (auth) => {
  const loginTemplate = await loadHTML(
    "./Login.html",
    import.meta.url,
    "#login__template"
  );
  await loadCSS("./Login.css", import.meta.url);
  const template = TransitionLoginSetUp(loginTemplate, auth);

  return template;
};

export default LoadLoginView;
