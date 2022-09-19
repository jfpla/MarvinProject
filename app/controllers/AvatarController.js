import gravatar from "../services/api/Gravatar.js";
import avatarView from "../views/avatar/AvatarView.js";

const LoadAvatarController = async () => {
  /**
   *
   * @param {Element} element
   * @return {Element}
   */
  const populateAvatar = (element) => {
    const avatarBox = element.querySelector(".avatar__content");
    const img = document.createElement("img");
    img.setAttribute("src", gravatarUrl);
    img.setAttribute("alt", "Avatar");
    avatarBox.appendChild(img);
    return element;
  };

  const view = await avatarView();

  const userEmail = "jfrpla@gmail.com";
  const gravatarUrl =
    localStorage.getItem(userEmail) || (await gravatar(userEmail));

  if (gravatarUrl) {
    localStorage.setItem(userEmail, gravatarUrl);
    const newView = await view.map(populateAvatar);
    console.log("NEW AvatarView", newView);
  }
};

export default LoadAvatarController;
