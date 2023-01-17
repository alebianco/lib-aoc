/**
 * Tests if the target value is an iterable.
 *
 * @example
 * isIterable([1, 2, 3]); // returns true
 * @example
 * isIterable("abc"); // returns true
 * @example
 * isIterable(true); // returns false
 *
 * @param {*} value a value to test
 * @returns {boolean} the test result
 */
export function isIterable (value) {
  return value !== null && Symbol.iterator in Object(value)
}
