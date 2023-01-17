import { isIterable } from './isIterable.js'

/**
 * Returns a sequence of enumeration pairs, starting at {@link offset} when defined or 0 otherwise.
 *
 * @example
 * enumerate([1, 2, 3]); // returns [[0, 1], [1, 2], [2, 3]]
 * @example
 * enumerate([1, 2, 3], 5); // returns [[5, 1], [6, 2], [7, 3]]
 * @example
 * enumerate([]); // returns []
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {number} [offset=0] the enumeration index offset
 * @yields {Pair<number, T>} the next enumeration pair
 * @returns {Generator<Pair<number, T>, void, void>}
 *
 * @throws {TypeError} when {@link start} is not a rational number
 * @throws {TypeError} when {@link offset} is not a whole number
 */
export function * enumerate (source, offset = 0) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(offset) || offset < 0) {
    throw new TypeError(`Argument 'offset' should be a whole number, received ${offset} (${typeof offset}).`)
  }

  let index = offset
  for (const element of source) {
    yield [index++, element]
  }
}
