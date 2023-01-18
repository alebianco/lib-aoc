import { isIterable } from './isIterable.js'

/**
 * Generates an infinite sequence, continuously repeating the values from the {@link source}.
 *
 * Will require some additional memory to store a copy of the values from the source, in order to repeat them.
 *
 * @example
 * cycle([1, 2]); // returns [1, 2, 1, 2, ...]
 * @example
 * cycle([]); // returns []
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the elements from
 * @yields the next value from the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 */
export function * cycle (source) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  const saved = []
  for (const element of source) {
    yield element
    saved.push(element)
  }

  if (saved.length > 0) {
    while (true) {
      yield * saved
    }
  }
}
