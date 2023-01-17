import { isIterable } from './isIterable.js'

/**
 * Generates a flat sequence of values by applying the {@link transform} function to each value emitted by the {@link source}.
 *
 * @example
 * find([1, 2, 3], (n) => [n, n]); // returns [1, 1, 2, 2, 3, 3]
 * @example
 * find([], (n) => [n, n]); // returns []
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @template U
 * @param {Iterable<T>} source where to take the values from
 * @param {Transformer<T, Iterable<U>>} transform a function that returns a new iterable for each value produced by the source
 * @yields {U} the next value from the flattened iterators
 * @returns {Generator<U, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link transform} is not a function
 */
export function * flatMap (source, transform) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    yield * transform(element)
  }
}
