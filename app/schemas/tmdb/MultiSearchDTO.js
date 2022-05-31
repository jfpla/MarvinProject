import PersonDTO from "./PersonDTO.js";

export default function (obj) {
  const person = PersonDTO(obj);
  const { known_for } = person;
  for (const show of known_for) {
    console.log(show.name);
  }
}
