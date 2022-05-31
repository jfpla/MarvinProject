import Show from "./Show.js";

// const show = {
//   // backdrop_path: "/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg",
//   first_air_date: "2022-02-17",
//   // genre_ids: [18, 10765, 9648],
//   // id: 95396,
//   // media_type: "tv",
//   name: "Severance",
//   origin_country: ["US"],
//   // original_language: "en",
//   original_name: "Severance",
//   // overview: "Mark leads a team of office workers whose memories...",
//   // popularity: 77.42,
//   // poster_path: "/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
//   // vote_average: 8.2,
//   // vote_count: 144,
// };

/**
 * TV Show Type
 * @typedef  {Object}   TVShowType
 * @property {string}   backdrop_path
 * @property {string}   first_air_date
 * @property {number[]} genre_ids
 * @property {number}   id
 * @property {string}   media_type
 * @property {string}   name
 * @property {string[]} origin_country
 * @property {string}   original_language
 * @property {string}   original_name
 * @property {string}   overview
 * @property {number}   popularity
 * @property {string}   poster_path
 * @property {number}   vote_average
 * @property {number}   vote_count
 *
 */

/**
 *
 * @param obj
 * @returns {TVShowType}
 * @type {(obj: Object) => TVShowType}
 */
export default function TVDTO(obj) {
  const show = Show(obj);
  return Object.assign(show, {
    first_air_date: obj.first_air_date,
    name: obj.name,
    origin_country: obj.origin_country,
    original_name: obj.original_name,
  });
}
