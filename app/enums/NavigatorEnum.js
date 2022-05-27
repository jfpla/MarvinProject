import { EnumKeyGenerator } from "./EnumGenerators.js";

const NavigatorEnum = {
  Home: "home",
  TV: "tv",
  Movies: "movies",
  Watching: "watching",
};

NavigatorEnum[Symbol.iterator] = EnumKeyGenerator;

export default Object.freeze(NavigatorEnum);
