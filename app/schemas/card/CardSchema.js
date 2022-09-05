import {
  deleteMovieById,
  deletePersonById,
  deleteTVById,
  getMovieById,
  getPersonById,
  getTVById,
  saveMovie,
  savePerson,
  saveTV,
} from "../../services/storage/TMDBRepository.js";
import {
  fetchMovie,
  fetchPerson,
  fetchTV,
} from "../../services/api/TMDBApi.js";

const personImageSettings = ({ imgBaseUrl, imgProfileRes, profile_path }) => {
  let frontThumbnail = "views/card/img/person-thumbnail.svg";
  let backgroundImage = "views/card/img/movie-thumbnail.svg";

  if (profile_path) {
    const imgProfile = `${imgBaseUrl}/${imgProfileRes}/${profile_path}`;
    frontThumbnail = imgProfile;
    backgroundImage = imgProfile;
  }

  return { frontThumbnail, backgroundImage };
};

const imageSettings = ({
  imgBaseUrl,
  imgBackRes,
  imgPosterRes,
  media_type,
  backdrop_path,
  poster_path,
}) => {
  let frontThumbnail = `views/card/img/${media_type}-thumbnail.svg`;
  let backgroundImage = `views/card/img/${media_type}-background.svg`;

  if (backdrop_path || poster_path) {
    frontThumbnail = `${imgBaseUrl}/${imgPosterRes}/${
      poster_path || backdrop_path
    }`;
    backgroundImage = `${imgBaseUrl}/${imgBackRes}/${
      backdrop_path || poster_path
    }`;
  }

  return { frontThumbnail, backgroundImage };
};

const CardSchema = (obj) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p";
  const imgBackRes = "w300";
  const imgPosterRes = "w342";
  const imgProfileRes = "w185";

  let images;
  let frontName;
  let rank;
  let frontStatsViewers;
  let backStreamingInfoLeftData;
  let backStreamingInfoLeftName;
  let backStreamingInfoRightData;
  let backStreamingInfoRightName;

  let saveItemDetail;
  let getItemDetailById;
  let deleteItemDetailById;
  let fetchItemDetailById;
  switch (obj.media_type) {
    case "person":
      images = personImageSettings({ imgBaseUrl, imgProfileRes, ...obj });
      frontName = obj.name;
      rank = "fa-user";
      frontStatsViewers = obj.popularity.toFixed().toString();
      backStreamingInfoLeftData = frontStatsViewers;
      backStreamingInfoLeftName = "Vote Avg";
      backStreamingInfoRightData = obj.known_for_department;
      backStreamingInfoRightName = "Known for";

      saveItemDetail = savePerson;
      getItemDetailById = getPersonById;
      deleteItemDetailById = deletePersonById;
      fetchItemDetailById = fetchPerson;
      break;
    case "tv":
      images = imageSettings({ imgBaseUrl, imgBackRes, imgPosterRes, ...obj });
      frontName = obj.name;
      rank = "fa-tv";
      frontStatsViewers = obj.popularity.toFixed().toString();
      backStreamingInfoLeftData = obj.vote_average.toFixed().toString();
      backStreamingInfoLeftName = "Vote Avg";
      backStreamingInfoRightData = obj.vote_count.toFixed().toString();
      backStreamingInfoRightName = "Vote cnt";

      saveItemDetail = saveTV;
      getItemDetailById = getTVById;
      deleteItemDetailById = deleteTVById;
      fetchItemDetailById = fetchTV;
      break;
    case "movie":
      images = imageSettings({ imgBaseUrl, imgBackRes, imgPosterRes, ...obj });
      frontName = obj.title;
      rank = "fa-video";
      frontStatsViewers = obj.popularity.toFixed().toString();
      backStreamingInfoLeftData = obj.vote_average.toFixed().toString();
      backStreamingInfoLeftName = "Vote Avg";
      backStreamingInfoRightData = obj.vote_count.toFixed().toString();
      backStreamingInfoRightName = "Vote cnt";

      saveItemDetail = saveMovie;
      getItemDetailById = getMovieById;
      deleteItemDetailById = deleteMovieById;
      fetchItemDetailById = fetchMovie;
      break;
    default:
      console.log("Unknown data type");
      break;
  }
  return {
    data: {
      id: obj.id,
      rank: rank,
      frontName: frontName,
      frontThumbnail: images.frontThumbnail,
      frontStatsViewers: frontStatsViewers,
      backgroundImage: images.backgroundImage,
      backStreamingInfoLeftData: backStreamingInfoLeftData,
      backStreamingInfoLeftName: backStreamingInfoLeftName,
      backStreamingInfoRightData: backStreamingInfoRightData,
      backStreamingInfoRightName: backStreamingInfoRightName,
    },
    methods: {
      saveItemDetail,
      getItemDetailById,
      deleteItemDetailById,
      fetchItemDetailById,
    },
  };
};
