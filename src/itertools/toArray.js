import { isIterable } from './isIterable.js'

/**
 * Eagerly consumes the {@link source} and collects all the values into an array.
 *
 * The source will be consumed in the process.
 *
 * @example
 * toArray([1, 2, 3]); // returns [1, 2, 3]
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @returns {T[]} a list of all the values emitted by the source
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 */
export function toArray (source) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  return Array.from(source)
}
