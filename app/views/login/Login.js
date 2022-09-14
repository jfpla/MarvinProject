//".bg-image > :not(.hidden):first-of-type"
const element = document.querySelector(
  ".bg-image > :not(.hidden):first-of-type"
);
console.log(element);

const elementAfter = window.getComputedStyle(element, "::after");
console.log(elementAfter);

element.addEventListener("click", (e) => {
  console.log(e.target);

  element.classList.add("fade");
  document.querySelector(".disabled").classList.add("fade");
  element.addEventListener(
    "transitionend",
    (e) => {
      console.log("transitionend", e);
      element.style.setProperty("--shadowBGColor", "rgba(255, 255, 255)");
      element.style.setProperty("--shadowScale", "200");
    },
    { once: true }
  );
});
