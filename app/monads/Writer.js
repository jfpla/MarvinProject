/**
 * The Absolute Best Intro to Monads For Software Engineers
 * https://www.youtube.com/watch?v=C2w45qRc3aU
 */

export const wrapWithLogs = (x) => ({
  result: x,
  logs: [],
});

export const runWithLogs = (input, transform) => {
  const newNumberWithLogs = transform(input.result);
  return {
    result: newNumberWithLogs.result,
    logs: input.logs.concat(newNumberWithLogs.logs),
  };
};

export const square = (x) => ({
  result: x * x,
  logs: [`Squared ${x} to get ${x * x}`],
});

export const addOne = (x) => ({
  result: x + 1,
  logs: [`Added 1 to ${x} to get ${x + 1}`],
});
