import { isIterable } from './isIterable.js'
import { from } from './from.js'

/**
 * Checks if all {@link sources} produce equal sequences: values pairwise equal and sequences of the same length.
 *
 * All sources will be consumed in the process.
 *
 * @example
 * equal([1, 2, 3], [1, 2, 3]); // returns true
 * @example
 * equal([1, 2, 3], [4, 5, 6]); // returns false
 * @example
 * equal([1, 2, 3], [1, 2, 3, 4]); // returns false
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {...Iterable<T>} sources the list of sequences to compare
 * @returns {boolean} true if all sequences are equal, false otherwise
 *
 * @throws {TypeError} when any of the {@link sources} is not an {@link Iterable}
 */
export function equal (...sources) {
  if (!sources.every(isIterable)) {
    const index = sources.findIndex(it => !isIterable(it))
    const value = sources[index]
    throw new TypeError(`Argument 'sources' should contain only iterables, received ${value} (${typeof value}) in sources[${index}].`)
  }

  if (sources.length <= 1) {
    return true
  }

  const [first, ...others] = sources.map(source => from(source))
  for (const value of first) {
    for (const it of others) {
      if (it.next().value !== value) {
        return false
      }
    }
  }

  return others.every(it => it.next().done === true)
}
