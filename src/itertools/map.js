import { isIterable } from './isIterable.js'

/**
 * Represents a transformer (non-interfering, stateless function) of one value.
 *
 * @callback Transformer
 * @template T
 * @template U
 * @param {T} value the value to transform
 * @returns {U} the value transformed
 */

/**
 * Generates a sequence of values by applying the {@link transform} function to each value emitted by the {@link source}.
 *
 * @example
 * map([1, 2, 3], (n) => n * n); // returns [1, 4, 9]
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @template U
 * @param {Iterable<T>} source where to take the values from
 * @param {Transformer<T, U>} transform a function to apply to each value emitted by the source
 * @yields {U} the next transformed value
 * @returns {Generator<U, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link transform} is not a function
 */
export function * map (source, transform) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    yield transform(element)
  }
}
