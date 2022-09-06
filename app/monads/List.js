const List = (x) => ({
  emit: () => x,
  chain: (f) => f(x),
  map: (f) => ListOf(f(x)),
  inspect: () => `List(${x})`,
  head: () => x[0],
  concat: (a) => ListOf(x.concat(a)),
});

const ListOf = (x) => (Array.isArray(x) ? List(x) : List([x]));

export default {
  of: ListOf,
};
