import { isIterable } from './isIterable.js'

/**
 * Represents a comparison of two values.
 *
 * @callback Comparator
 * @template T
 * @param {T} a the first value to compare
 * @param {T} b the second value to compare
 * @returns {-1|0|1} A negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.
 */

const numberComparator = (a, b) => a < b ? -1 : a > b ? 1 : 0

/**
 * Returns a new sequence from {@link source} with all it's values sorted.
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {Comparator} [comparator] function used to determine the order of the values. If omitted, the elements are sorted in ascending order.
 * @param {boolean} [reverse=false] invert the order of the values
 * @yields {T} the next ordered value
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link transform} is not a function or undefined
 */
export function * sorted (source, comparator = undefined, reverse = false) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  const list = Array.from(source).sort(comparator ?? numberComparator)
  if (reverse) {
    list.reverse()
  }
  yield * list
}
