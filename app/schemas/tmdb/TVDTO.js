import Show from "./Show.js";

/**
 * TV Show Type
 * @typedef  {Object}   TVShowType
 * @property {string}   backdrop_path     "/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg"
 * @property {string}   first_air_date    "2022-02-17"
 * @property {number[]} genre_ids         [18, 10765, 9648]
 * @property {number}   id                95396
 * @property {string}   media_type        "tv"
 * @property {string}   name              "Severance"
 * @property {string[]} origin_country    ["US"]
 * @property {string}   original_language "en"
 * @property {string}   original_name     "Severance"
 * @property {string}   overview          "Mark leads a team of office work..."
 * @property {number}   popularity        77.42
 * @property {string}   poster_path       "/lFf6LLrQjYldcZItzOkGmMMigP7.jpg"
 * @property {number}   vote_average      8.2
 * @property {number}   vote_count        144
 *
 */

/**
 * TV Show DTO Factory
 * @param   {Object} obj
 * @returns {TVShowType}
 * @type    {(obj: Object) => TVShowType}
 */
export default function TVDTO(obj) {
  const show = Show(obj);
  return Object.assign(show, {
    first_air_date: obj.first_air_date,
    name: obj.name,
    origin_country: [...obj.origin_country],
    original_name: obj.original_name,
  });
}
