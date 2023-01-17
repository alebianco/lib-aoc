import { isIterable } from './isIterable.js'

/**
 * Get the first value from the {@link source} for which the {@link predicate} holds true.
 *
 * The source will be consumed in the process.
 *
 * @example
 * find([5, 6, 7, 8], (n) => n % 2 === 0); // returns 6
 * @example
 * find([6, 7, 8, 9], (n) => n % 5 === 0); // returns undefined
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {Predicate<T>} [predicate=Boolean] a function to test each value
 * @returns {T|undefined} the first value for which the predicate test passed, undefined if none passed
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link predicate} is not an function
 */
export function find (source, predicate = Boolean) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    if (predicate(element)) {
      return element
    }
  }
  return undefined
}
