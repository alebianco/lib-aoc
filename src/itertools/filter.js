import { isIterable } from './isIterable.js'

/**
 * Represents a predicate (boolean-valued function) of one value.
 *
 * @callback Predicate
 * @template T
 * @param {T} value the value to test
 * @returns {boolean} true if the value to test matches the predicate, otherwise false
 */

/**
 * Returns a sequence of values from the {@link source} for which the {@link predicate} holds true.
 *
 * @example
 * filter([1, 2, 3, 4, 5], (n) => n % 2 === 0); // returns [2, 4]
 * @example
 * filter([1, 2, 3], (n) => n > 10); // returns []
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {Predicate<T>} predicate a function to decide if a value should be emitted or not
 * @yields {T} the next value that pass the predicate test
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link predicate} is not an function
 */
export function * filter (source, predicate) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    if (predicate(element)) {
      yield element
    }
  }
}
