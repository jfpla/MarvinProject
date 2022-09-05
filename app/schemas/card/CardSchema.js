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

/**
 *
 * @param imgBaseUrl
 * @param imgProfileRes
 * @param profile_path
 * @return {{backgroundImage: string, frontThumbnail: string}}
 */
const personImageSettings = ({ imgBaseUrl, imgProfileRes, profile_path }) => {
  let frontThumbnail = "views/card/img/person-thumbnail.svg";
  let backgroundImage = "views/card/img/movie-thumbnail.svg";

  if (profile_path) {
    const imgProfile = `${imgBaseUrl}/${imgProfileRes}${profile_path}`;
    frontThumbnail = imgProfile;
    backgroundImage = imgProfile;
  }

  return { frontThumbnail, backgroundImage };
};

/**
 *
 * @param imgBaseUrl
 * @param imgBackRes
 * @param imgPosterRes
 * @param media_type
 * @param backdrop_path
 * @param poster_path
 * @return {{backgroundImage: string, frontThumbnail: string}}
 */
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
    frontThumbnail = `${imgBaseUrl}/${imgPosterRes}${
      poster_path || backdrop_path
    }`;
    backgroundImage = `${imgBaseUrl}/${imgBackRes}${
      backdrop_path || poster_path
    }`;
  }

  return { frontThumbnail, backgroundImage };
};

/**
 *
 * @param {(TVShowType|MovieShowType|PersonType)} obj
 * @return {{data: {backStreamingInfoRightName: string, backStreamingInfoLeftData: string, backStreamingInfoLeftName: string, backStreamingInfoRightData, backgroundImage: string, rank: string, frontThumbnail: string, id, frontName, frontStatsViewers: string}, methods: {deleteItemDetailById, saveItemDetail, getItemDetailById, fetchItemDetailById}}}
 * @constructor
 */
const CardSchema = (obj) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p";
  const imgBackRes = "w300";
  const imgPosterRes = "w342";
  const imgProfileRes = "w185";

  /**
   *
   * @param frontThumbnail
   * @param backgroundImage
   * @param frontName
   * @param rank
   * @param backStreamingInfoLeftName
   * @param backStreamingInfoLeftData
   * @param backStreamingInfoRightName
   * @param backStreamingInfoRightData
   * @param frontStatsViewers
   * @return {{data: {backStreamingInfoRightName, backStreamingInfoLeftData, backStreamingInfoLeftName, backStreamingInfoRightData, backgroundImage, rank, frontThumbnail, id: (number|*), frontName, frontStatsViewers}}}
   */
  const hydrateDataObject = (
    { frontThumbnail, backgroundImage },
    frontName,
    rank,
    backStreamingInfoLeftName,
    backStreamingInfoLeftData,
    backStreamingInfoRightName,
    backStreamingInfoRightData,
    frontStatsViewers
  ) => {
    return {
      data: {
        id: obj.id,
        rank,
        frontName,
        frontThumbnail,
        frontStatsViewers,
        backgroundImage,
        backStreamingInfoLeftData,
        backStreamingInfoLeftName,
        backStreamingInfoRightData,
        backStreamingInfoRightName,
      },
    };
  };

  /**
   *
   * @param saveItemDetail
   * @param getItemDetailById
   * @param deleteItemDetailById
   * @param fetchItemDetailById
   * @return {{methods: {deleteItemDetailById, saveItemDetail, getItemDetailById, fetchItemDetailById}}}
   */
  const hydrateMethods = (
    saveItemDetail,
    getItemDetailById,
    deleteItemDetailById,
    fetchItemDetailById
  ) => ({
    methods: {
      saveItemDetail,
      getItemDetailById,
      deleteItemDetailById,
      fetchItemDetailById,
    },
  });

  switch (obj.media_type) {
    case "person":
      return {
        ...hydrateDataObject(
          personImageSettings({ imgBaseUrl, imgProfileRes, ...obj }),
          obj.name,
          "fa-user",
          "Vote Avg",
          obj.popularity.toFixed().toString(),
          "Known for",
          obj.known_for_department,
          obj.popularity.toFixed().toString()
        ),
        ...hydrateMethods(
          savePerson,
          getPersonById,
          deletePersonById,
          fetchPerson
        ),
      };
    case "tv":
      return {
        ...hydrateDataObject(
          imageSettings({ imgBaseUrl, imgBackRes, imgPosterRes, ...obj }),
          obj.name,
          "fa-tv",
          "Vote Avg",
          obj.vote_average.toFixed().toString(),
          "Vote cnt",
          obj.vote_count.toFixed().toString(),
          obj.popularity.toFixed().toString()
        ),
        ...hydrateMethods(saveTV, getTVById, deleteTVById, fetchTV),
      };

    case "movie":
      return {
        ...hydrateDataObject(
          imageSettings({ imgBaseUrl, imgBackRes, imgPosterRes, ...obj }),
          obj.title,
          "fa-video",
          "Vote Avg",
          obj.vote_average.toFixed().toString(),
          "Vote cnt",
          obj.vote_count.toFixed().toString(),
          obj.popularity.toFixed().toString()
        ),
        ...hydrateMethods(saveMovie, getMovieById, deleteMovieById, fetchMovie),
      };
    default:
      console.log("Unknown data type");
      break;
  }
};

export default CardSchema;
