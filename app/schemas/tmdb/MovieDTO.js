import Show from "./Show.js";

/**
 * Movie Show Type
 * @typedef   {Object}    MovieShowType
 * @property  {boolean}   adult             false
 * @property  {string}    backdrop_path     "/5xeC9mN6Aq2PmbbglqxiJxSPgvl.jpg"
 * @property  {number[]}  genre_ids         [27, 35, 53]
 * @property  {number}    id                5072
 * @property  {string}    media_type        "movie"
 * @property  {string}    original_language "en"
 * @property  {string}    original_title    "Severance"
 * @property  {string}    overview          "Members of the Palisades Defense..."
 * @property  {number}    popularity        13.552
 * @property  {string}    poster_path       "/yg1XRTyH5knwh3Tnij2sUV0ZZ5w.jpg"
 * @property  {string}    release_date      "2006-05-19"
 * @property  {string}    title             "Severance"
 * @property  {boolean}   video             false
 * @property  {number}    vote_average      6.3
 * @property  {number}    vote_count        431
 *
 */

/**
 *
 * @param   {Object} obj
 * @returns {MovieShowType}
 * @type    {(obj: Object) => MovieShowType}
 */
export default function (obj) {
  const show = Show(obj);
  return Object.assign(show, {
    adult: obj.adult,
    original_title: obj.original_title,
    release_date: obj.release_date,
    title: obj.title,
    video: obj.video,
  });
}
