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
 *
 * @param obj
 * @returns {{
 *    backdrop_path: string,
 *    genre_ids: number[],
 *    id: number,
 *    media_type: string,
 *    original_language: string,
 *    overview: string,
 *    popularity: number,
 *    poster_path: string,
 *    vote_average: number,
 *    vote_count: number
 * }} Show
 * @constructor
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
