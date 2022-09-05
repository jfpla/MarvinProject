const Just = (x) => ({
  emit: () => x,
  chain: (f) => f(x),
  map: (f) => MaybeOf(f(x)),
  fork: (_, g) => g(x),
  isJust: true,
  isNothing: false,
  inspect: () => `Just(${x})`,
});

const Nothing = (x) => ({
  emit: () => Nothing(),
  chain: (_) => Nothing(),
  map: (_) => Nothing(),
  fork: (f, _) => f(),
  isJust: false,
  isNothing: true,
  inspect: () => `Nothing`,
});

const MaybeOf = (x) =>
  x === null || x === undefined || x.isNothing ? Nothing() : Just(x);

export default {
  of: MaybeOf,
};
