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
  const viewers = cardTemplate.querySelector(".viewers");
  const voteAvg = cardTemplate.querySelector(
    ".back > .streaming-info > p:first-child"
  );
  const voteCnt = cardTemplate.querySelector(
    ".back > .streaming-info > p:last-child"
  );

  viewers.textContent = data.popularity.toFixed().toString();
  switch (data.media_type) {
    case "person":
      if (data.profile_path) {
        imgProfile = `${imgBaseUrl}/${imgProfileRes}/${data.profile_path}`;
        thumbnail.src = imgProfile;
        background.src = imgProfile;
      } else {
        thumbnail.src = "views/card/img/person-thumbnail.svg";
        background.src = "views/card/img/movie-thumbnail.svg";
      }
      title.textContent = data.name;
      voteAvg.firstChild.textContent = viewers.textContent;
      voteCnt.firstChild.textContent = data.known_for_department;
      voteCnt.lastChild.textContent = "Known for";
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
      } else {
        thumbnail.src = "views/card/img/tv-thumbnail.svg";
        background.src = "views/card/img/tv-background.svg";
      }

      title.textContent = data.name;
      rank.classList.remove("fa-user");
      rank.classList.add("fa-tv");
      voteAvg.firstChild.textContent = data.vote_average.toFixed().toString();
      voteCnt.firstChild.textContent = data.vote_count.toFixed().toString();
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
      } else {
        thumbnail.src = "views/card/img/movie-thumbnail.svg";
        background.src = "views/card/img/movie-background.svg";
      }

      title.textContent = data.title;
      rank.classList.remove("fa-user");
      rank.classList.add("fa-video");
      voteAvg.firstChild.textContent = data.vote_average.toFixed().toString();
      voteCnt.firstChild.textContent = data.vote_count.toFixed().toString();
      break;
    default:
      console.log("Unknown data type");
      break;
  }

  return cardTemplate.cloneNode(true).childNodes;
};

export default LoadCardController;
