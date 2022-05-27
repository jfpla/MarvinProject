import gravatar from "../services/api/Gravatar.js";
import avatarView from "../views/avatar/AvatarView.js";

const LoadAvatarController = async () => {
  const avatarNode = await avatarView();

  const userEmail = "jfrpla@gmail.com";
  const gravatarUrl =
    localStorage.getItem(userEmail) || (await gravatar(userEmail));

  if (gravatarUrl) {
    localStorage.setItem(userEmail, gravatarUrl);
    const avatarBox = avatarNode.querySelector(".avatar__content");
    const img = document.createElement("img");
    img.setAttribute("src", gravatarUrl);
    img.setAttribute("alt", "Avatar");
    avatarBox.appendChild(img);
  }
};

export default LoadAvatarController;
