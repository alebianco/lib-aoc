import { isIterable } from './isIterable.js'

/**
 * Returns a sequence with the last {@link limit} values of the {@link source}.
 *
 * @example
 * tail([1, 2, 3, 4, 5], 2); // returns [4, 5]
 * @example
 * tail([1], 2); // returns [1]
 * @example
 * tail([1, 2, 3], 0); // returns []
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {number} limit number of elements to keep at the end
 * @yields {T} the next value from the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link limit} is not a whole number
 */
export function * tail (source, limit = 1) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError(`Argument 'limit' should be a whole number, received ${limit} (${typeof limit}).`)
  }

  if (limit > 0) {
    const buffer = []
    for (const element of source) {
      buffer.push(element)
      if (buffer.length > limit) {
        buffer.shift()
      }
    }
    yield * buffer
    buffer.length = 0
  }
}
