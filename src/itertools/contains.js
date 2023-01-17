import { isIterable } from './isIterable.js'

/**
 * Returns true when one of the values in the {@link source} is strictly equal to the {@link needle} value.
 *
 * The source will be consumed in the process.
 *
 * @example
 * contains([1, 2, 3], 1); // returns true
 * @example
 * contains([1, 2, 3], 4); // returns false
 * @example
 * contains([], 1); // returns false
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source the sequence of values to check
 * @param {T} needle the value to find
 * @returns {boolean} true if the value is present, otherwise false
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 */
export function contains (source, needle) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    if (element === needle) {
      return true
    }
  }
  return false
}
