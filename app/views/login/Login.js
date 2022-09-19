/** Transitions **/
import View from "../View.js";
import { login } from "../../auth/Auth.js";

const TransitionLoginSetUp = (view, auth) => {
  const showLoginBoxGhost = (event) => {
    const loginElement = event.target;
    loginElement.style.setProperty("--shadowBGColor", "rgba(255, 255, 255)");
    loginElement.style.setProperty("--shadowScale", "200");
  };

  const loginTransition = (event) => {
    const loginElement = event.target;

    loginElement.classList.add("fade");
    const disabledElement =
      loginElement.parentElement.querySelector(".disabled");
    console.log("disabledElement>", disabledElement);
    disabledElement.classList.add("fade");
    loginElement.addEventListener("transitionend", showLoginBoxGhost, {
      once: true,
    });
  };

  /**
   *
   * @param {Element} element
   * @return {Element}
   */
  const clickListener = (element) => {
    const loginElement = element.querySelector(".login");
    console.log(loginElement);

    loginElement.addEventListener("click", (e) => {
      loginTransition(e);
      login(auth)();
    });
    return element;
  };

  return view.map(clickListener);
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
  const view = await View.of({
    baseUrl: import.meta.url,
    cssRelativeUrl: "./Login.css",
    htmlRelativeUrl: "./Login.html",
  });
  console.log("LoadLoginView", view);

  const newView = await TransitionLoginSetUp(view, auth);
  console.log("new LoadLoginView > ", newView);
  return newView;
};

export default LoadLoginView;
