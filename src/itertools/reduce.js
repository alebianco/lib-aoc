import { isIterable } from './isIterable.js'
import { from } from './from.js'

/**
 * Represents an associative accumulator function for combining two values.
 *
 * @callback Accumulator
 * @template T
 * @template U
 * @param {U} accumulator the value to accumulate with
 * @param {T} value the value to accumulate
 * @returns {U} the accumulated result
 */

/**
 * Reduces a sequence of values to a single value by applying the {@link reducer} function to each value emitted by the {@link source}.
 *
 * The source will be consumed in the process.
 *
 * @example
 * reduce([1, 2, 3, 4], (t, n) => t + n); // returns 10
 * @example
 * reduce([1, 2, 3, 4], (t, n) => t * n); // returns 24
 * @example
 * reduce([1, 2, 3, 4], (m, n) => Math.max(m, n); // returns 4
 *
 * @requires module:itertools.from
 * @requires module:itertools.isIterable
 *
 * @template T
 * @template U
 * @param {Iterable<T>} source where to take the values from
 * @param {Accumulator<T, U>} reducer a function to accumulate all value emitted by the source
 * @param {U} [initialValue] a starting value for the accumulator; if `undefined` the first value from the source is used
 * @returns {U} the result of the reduction
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link reducer} is not a function
 */
export function reduce (source, reducer, initialValue = undefined) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  const it = from(source)
  let result = initialValue ?? it.next().value
  for (const element of it) {
    result = reducer(result, element)
  }
  return result
}
