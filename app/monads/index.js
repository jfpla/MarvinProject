/**
 * Building Expressive Monads in Javascript: Introduction
 * https://dev.to/rgeraldporter/building-expressive-monads-in-javascript-introduction-23b
 *
 * The Absolute Best Intro to Monads For Software Engineers
 * https://www.youtube.com/watch?v=C2w45qRc3aU
 * */

import Identity from "./Identity.js";
import List from "./List.js";
import Maybe from "./Maybe.js";
import { addOne, runWithLogs, square, wrapWithLogs } from "./Writer.js";

const one = Identity.of(1);
const two = one.map((a) => a + 1);

console.log(one.inspect());

console.log(two.inspect());

const myNumbers = List.of([1, 3, 4, 7, 10]);

// uncomment a console.log below to see the value

console.log(myNumbers.inspect());
console.log(myNumbers.concat([12]).inspect());

console.log("####################");
const display = (a) => {
  console.log(a);
  return a;
};
const fahrenheitToCelsius = (a) => (a - 32) * 0.5556;

const reading1 = 15;
const reading2 = null;

const temp1C = Maybe.of(reading1).map(fahrenheitToCelsius);
console.log(temp1C.inspect());

const temp2C = Maybe.of(reading2).map(fahrenheitToCelsius);
console.log(temp2C.inspect());

console.log("####################");
const A = temp1C.fork(
  (_) => display("ERR!"),
  (t) => display(`${t}ªC`)
);

const B = temp2C.fork(
  (_) => console.log("ERR!"),
  (t) => display(`${t}ªC`)
);
console.log("####################");
console.log(A, B);
console.log(
  "T1C:",
  temp1C.emit(),
  temp1C.chain((v) => v)
);
console.log("########################################");
const a = wrapWithLogs(5);
const b = runWithLogs(a, addOne);
const c = runWithLogs(b, square);
console.log("c: ", c);
