import CardView from "../views/card/CardView.js";

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @return {Promise<Node>}
 */
const LoadCardController = async (data) => {
  const cardTemplate = await CardView();
  const imgBaseUrl = "https://image.tmdb.org/t/p";
  const imgBackRes = "w300";
  const imgPosterRes = "w342";
  const imgProfileRes = "w185";
  let imgBack = "";
  let imgPoster = "";
  let imgProfile = "";

  const thumbnail = cardTemplate.querySelector(".front .thumbnail");
  const title = cardTemplate.querySelector(".front .name");
  const background = cardTemplate.querySelector(".background img");
  const rank = cardTemplate.querySelector(".rank i");

  switch (data.media_type) {
    case "person":
      if (data.profile_path) {
        imgProfile = `${imgBaseUrl}/${imgProfileRes}/${data.profile_path}`;
        thumbnail.src = imgProfile;
        background.src = imgProfile;
      }
      title.textContent = data.name;
      break;
    case "tv":
      if (data.backdrop_path || data.poster_path) {
        imgBack = `${imgBaseUrl}/${imgBackRes}/${
          data.backdrop_path || data.poster_path
        }`;
        imgPoster = `${imgBaseUrl}/${imgPosterRes}/${
          data.poster_path || data.backdrop_path
        }`;
        thumbnail.src = imgPoster;
        background.src = imgBack;
      }

      title.textContent = data.name;
      rank.classList.remove("fa-user");
      rank.classList.add("fa-tv");
      break;
    case "movie":
      if (data.backdrop_path || data.poster_path) {
        imgBack = `${imgBaseUrl}/${imgBackRes}/${
          data.backdrop_path || data.poster_path
        }`;
        imgPoster = `${imgBaseUrl}/${imgPosterRes}/${
          data.poster_path || data.backdrop_path
        }`;
        thumbnail.src = imgPoster;
        background.src = imgBack;
      }

      title.textContent = data.title;
      rank.classList.remove("fa-user");
      rank.classList.add("fa-video");
      break;
    default:
      console.log("Unknown data type");
      break;
  }

  return cardTemplate.cloneNode(true).childNodes;
};

export default LoadCardController;
