import { isIterable } from './isIterable.js'

/**
 * Generates a sequence of values from the first source until exhausted, then proceeds to the next source until all {@link sources} are exhausted.
 *
 * If a source is not an {@link Iterable}, it is yielded as is as part of the sequence.
 *
 * Will require some additional memory to store a copy of the values from the source, in order to repeat them.
 *
 * @example
 * chain([1, 2], [3, 4]); // returns [1, 2, 3, 4]
 * @example
 * chain(1, [2, 3], 4); // returns [1, 2, 3, 4]
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {...Iterable<T>|T} sources the list of sequences or values to concatenate
 * @yields the next value from the sources
 * @returns {Generator<T, void, void>} the sequence generator
 */
export function * chain (...sources) {
  for (const source of sources) {
    if (isIterable(source)) {
      yield * source
    } else {
      yield source
    }
  }
}
