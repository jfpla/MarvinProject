/**
 * https://programmingwithmosh.com/javascript/javascript-throttle-and-debounce-patterns/
 * */

export function throttle(callback, interval) {
  let enableCall = true;

  return function (...args) {
    if (!enableCall) return;

    enableCall = false;
    // console.log("callbackThrottle", callback);
    callback.apply(this, args);
    setTimeout(() => (enableCall = true), interval);
  };
}

export function debounce(callback, interval) {
  let debounceTimeoutId;

  return function (...args) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval);
  };
}
