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
