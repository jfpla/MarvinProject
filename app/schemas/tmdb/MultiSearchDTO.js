import PersonDTO from "./PersonDTO.js";
import TVDTO from "./TVDTO.js";
import MovieDTO from "./MovieDTO.js";

export default function (obj) {
  const person = PersonDTO(obj);
  const known_for = person.known_for;
  for (const knownForElement of known_for) {
    knownForElement;
  }
}
