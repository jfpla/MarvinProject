/**
 * Show Pseudo Type
 * @typedef   {Object}    ShowType
 * @property  {string}    backdrop_path     "/5xeC9mN6Aq2PmbbglqxiJxSPgvl.jpg"
 * @property  {number[]}  genre_ids         [27, 35, 53]
 * @property  {number}    id                5072
 * @property  {string}    media_type        "movie"
 * @property  {string}    original_language "en"
 * @property  {string}    overview          "The show description..."
 * @property  {number}    popularity        13.552
 * @property  {string}    poster_path       "/yg1XRTyH5knwh3Tnij2sUV0ZZ5w.jpg"
 * @property  {number}    vote_average      6.3
 * @property  {number}    vote_count        431
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
