import CardView from "../views/card/CardView.js";

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @return {Promise<Node>}
 */
const LoadCardController = async (data) => {
  const cardTemplate = await CardView();
  const title = cardTemplate.querySelector(".card__title");
  const body = cardTemplate.querySelector(".card__body");
  if (data.media_type === "movie") {
    title.textContent = data.title;
    body.textContent = data.overview;
  } else if (data.media_type === "tv") {
    title.textContent = data.name;
    body.textContent = data.overview;
  } else {
    title.textContent = data.name;
    body.textContent = data.known_for_department;
  }
  return cardTemplate.cloneNode(true);
};

export default LoadCardController;
