/** login **/

const loginElement = document.querySelector(".login");
console.log(loginElement);

const showLoginBoxGhost = (event) => {
  const loginElement = event.target;
  loginElement.style.setProperty("--shadowBGColor", "rgba(255, 255, 255)");
  loginElement.style.setProperty("--shadowScale", "200");
};

const loginTransition = (event) => {
  const loginElement = event.target;

  loginElement.classList.add("fade");
  document.querySelector(".disabled").classList.add("fade");
  loginElement.addEventListener("transitionend", showLoginBoxGhost, {
    once: true,
  });
};

loginElement.addEventListener("click", loginTransition);

/** logout **/

const logoutElement = document.querySelector(".logout");
console.log(logoutElement);
const logoutTransition = () => {
  toggleLogin();
};

logoutElement.addEventListener("click", logoutTransition);

/** toggle login **/

const toggleLogin = () => {
  const loginLayer = document.querySelector(".bg-image > div:first-of-type");
  const loginLink = document.querySelector(".bg-image > a:first-of-type");

  const logoutLayer = document.querySelector(".bg-image > div:last-of-type");
  const logoutLink = document.querySelector(".bg-image > a:last-of-type");

  const isLoginLinkHidden = loginLink.classList.contains("hidden");

  loginLayer.className = "";
  loginLink.className = "";
  logoutLayer.className = "";
  logoutLink.className = "";

  if (isLoginLinkHidden) {
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
};
