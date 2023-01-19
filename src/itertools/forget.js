import { isIterable } from './isIterable.js'

/**
 * Returns a sequence of values from the {@link source} except the last {@link limit}.
 *
 * @example
 * forget([1, 2, 3, 4, 5], 2); // returns [1, 2, 3]
 * @example
 * forget([1], 2); // returns []
 * @example
 * forget([1, 2, 3], 0); // returns [1, 2, 3]
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {number} limit number of values to discard from the end
 * @yields {T} the next value from the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link limit} is not a whole number
 */
export function * forget (source, limit) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError(`Argument 'limit' should be a whole number, received ${limit} (${typeof limit}).`)
  }

  if (limit === 0) {
    yield * source
  } else {
    const buffer = []
    for (const element of source) {
      buffer.push(element)
      if (buffer.length > limit) {
        yield buffer.shift()
      }
    }
    buffer.length = 0
  }
}
