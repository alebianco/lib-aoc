import { from } from './from.js'
import { isIterable } from './isIterable.js'

/**
 * Returns a sequence containing only the first {@link limit} elements of the {@link source}.
 *
 * @example
 * take([1, 2, 3], 2); // returns [1, 2]
 * @example
 * take([1], 2); // returns [1]
 * @example
 * take([1, 2, 3], 0); // returns []
 *
 * @requires module:itertools.from
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the elements from
 * @param {number} limit number of elements to take before terminating the sequence
 * @yields {T} the next value of the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link limit} is not a whole number
 */
export function * take (source, limit) {
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
    if (!element.done) {
      yield element.value
    } else {
      break
    }
  }
}
