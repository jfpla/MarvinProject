// const show = {
//   backdrop_path: "/5xeC9mN6Aq2PmbbglqxiJxSPgvl.jpg",
//   genre_ids: [27, 35, 53],
//   id: 5072,
//   media_type: "movie",
//   original_language: "en",
//   overview: "",
//   popularity: 13.552,
//   poster_path: "/yg1XRTyH5knwh3Tnij2sUV0ZZ5w.jpg",
//   vote_average: 6.3,
//   vote_count: 431,
// };

/**
 * Show Pseudo Type
 * @typedef   {Object}    ShowType
 * @property  {string}    backdrop_path
 * @property  {number[]}  genre_ids
 * @property  {number}    id
 * @property  {string}    media_type
 * @property  {string}    original_language
 * @property  {string}    overview
 * @property  {number}    popularity
 * @property  {string}    poster_path
 * @property  {number}    vote_average
 * @property  {number}    vote_count
 */

/**
 *
 * @param {Object} obj
 * @returns {ShowType}
 */
export default function (obj) {
  return {
    backdrop_path: obj.backdrop_path,
    genre_ids: obj.genre_ids,
    id: obj.id,
    media_type: obj.media_type,
    original_language: obj.original_language,
    overview: obj.overview,
    popularity: obj.popularity,
    poster_path: obj.poster_path,
    vote_average: obj.vote_average,
    vote_count: obj.vote_count,
  };
}
