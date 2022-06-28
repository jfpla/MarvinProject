import CardView from "../views/card/CardView.js";
import { fetchMovie, fetchPerson, fetchTV } from "../services/api/TMDBApi.js";
import {
  deletePersonById,
  getMovieById,
  getPersonById,
  getTVById,
  saveMovie,
  savePerson,
  saveTV,
} from "../services/storage/TMDBRepository.js";

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} data
 * @return {Promise<Node[]>}
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
  // const overview = cardTemplate.querySelector(".back > p:first-of-type");
  const btnWatchlist = cardTemplate.querySelector(
    ".back > .buttons > button:first-child"
  );
  const btnDetails = cardTemplate.querySelector(
    ".back > .buttons > button:last-child"
  );
  // console.log(btnWatchlist, btnDetails);
  let storedItem;
  viewers.textContent = data.popularity.toFixed().toString();
  switch (data.media_type) {
    case "person":
      storedItem = await getPersonById(data.id);
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
      storedItem = await getTVById(data.id);
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
      // overview.textContent = data.overview;
      break;
    case "movie":
      storedItem = await getMovieById(data.id);
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
      // overview.textContent = data.overview;
      break;
    default:
      console.log("Unknown data type");
      break;
  }

  const btnSelectCallback = (btn) => {
    return () => {
      btn.classList.add("btn-selected");
      btn.textContent = "Remove from Watchlist";
    };
  };

  if (storedItem) {
    console.log(storedItem);
    btnSelectCallback(btnWatchlist)();
  }

  btnWatchlist.addEventListener("click", (e) => {
    console.log("Click:", e);
  });

  const clone = [...cardTemplate.cloneNode(true).childNodes];
  clone.forEach((node) => {
    // An Element Node Type (1) is needed. https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    if (node.nodeType !== 1) return;

    const btnW = node.querySelector(".back > .buttons > button:first-child");
    btnW.addEventListener("click", async (e) => {
      console.log("Click:", data.media_type, e);
      switch (data.media_type) {
        case "movie":
          await saveMovie(
            data.id,
            await fetchMovie(data.id),
            btnSelectCallback(btnW)
          );
          break;
        case "tv":
          await saveTV(
            data.id,
            await fetchTV(data.id),
            btnSelectCallback(btnW)
          );
          break;
        case "person":
        default:
          if (storedItem) {
            await deletePersonById(storedItem.id, () => {
              btnW.classList.remove("btn-selected");
              btnW.textContent = "Add to Watchlist";
            });
          } else {
            await savePerson(
              data.id,
              await fetchPerson(data.id),
              btnSelectCallback(btnW)
            );
          }
          break;
      }
    });
  });

  return clone;
};

export default LoadCardController;
