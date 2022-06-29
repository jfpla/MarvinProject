import PersonDTO from "./PersonDTO.js";
import TVDTO from "./TVDTO.js";
import MovieDTO from "./MovieDTO.js";

/**
 * @typedef   {Object}                                  MultiSearchType
 * @property  {number}                                  page
 * @property  {(TVShowType|MovieShowType|PersonType)[]} results
 * @property  {number}                                  total_pages
 * @property  {number}                                  total_results
 */

/**
 * MultiSearch DTO Factory
 * @param   {Object}  obj
 * @returns {MultiSearchType}
 * @type    {(obj: Object) => MultiSearchType}
 */
export default function (obj) {
  return {
    page: obj.page,
    results: obj.results.map((item) => {
      switch (item.media_type) {
        case "tv":
          return TVDTO(item);
        case "movie":
          return MovieDTO(item);
        default:
          return PersonDTO(item);
      }
    }),
    total_pages: obj.total_pages,
    total_results: obj.total_results,
  };
}
