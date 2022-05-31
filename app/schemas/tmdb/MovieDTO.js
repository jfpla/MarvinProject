import TVDTO from "./TVDTO.js";

const movie = {
  adult: false,
  // backdrop_path: "/5xeC9mN6Aq2PmbbglqxiJxSPgvl.jpg",
  // genre_ids: [27, 35, 53],
  // id: 5072,
  // media_type: "movie",
  // original_language: "en",
  original_title: "Severance",
  // overview: "Members of the Palisades Defense Corp. sales group arrive in Europe...",
  // popularity: 13.552,
  // poster_path: "/yg1XRTyH5knwh3Tnij2sUV0ZZ5w.jpg",
  release_date: "2006-05-19",
  title: "Severance",
  video: false,
  // vote_average: 6.3,
  // vote_count: 431,
};

export default function (obj) {
  const tv = TVDTO(obj);
  tv.genre_ids;
}
