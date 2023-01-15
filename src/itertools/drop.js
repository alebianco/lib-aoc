import { from } from './from.js'
import { isIterable } from './isIterable.js'

/**
 * Returns a sequence with the remaining elements of the {@link source} after discarding the first {@link limit} elements.
 *
 * @example
 * drop([1, 2, 3, 4, 5], 2); // returns [3, 4, 5]
 * @example
 * drop([1], 2); // returns []
 * @example
 * drop([1, 2, 3], 0); // returns [1, 2, 3]
 *
 * @requires module:itertools.from
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the elements from
 * @param {number} limit number of elements to discard
 * @yields {T} the next value from the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link limit} is not a whole number
 */
export function * drop (source, limit) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError(`Argument 'limit' should be a whole number, received ${limit} (${typeof limit}).`)
  }

  const it = from(source)
  let count = limit
  while (count--) {
    const element = it.next()
    if (element.done) {
      break
    }
  }
  yield * it
}
