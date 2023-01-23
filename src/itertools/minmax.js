import { isIterable } from './isIterable.js'

/**
 * Returns a tuple with the smallest and largest values from the {@link source}. When provided, the {@link transform} function transform the original values before comparing them.
 *
 * The source will be consumed in the process.
 *
 * @example
 * max([1, 2, 3]); // returns [1, 3]
 * @example
 * max('ABc', (char) => char.toLowerCase().charCodeAt(0)); // returns ['A', 'c']
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @template U
 * @param {Iterable<T>} source sequence of values to compare
 * @param {Transformer<T, U>} [transform] a function to apply to each value emitted by the source
 * @returns {Pair<T, T>} the smallest and largest values from the sequence
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link transform} is not a function
 */
export function minmax (source, transform) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  let maxElement
  let maxValue

  let minElement
  let minValue

  for (const element of source) {
    const value = transform === undefined ? element : transform(element)
    if (minValue === undefined || minValue > value) {
      minElement = element
      minValue = value
    }
    if (maxElement === undefined || maxValue < value) {
      maxElement = element
      maxValue = value
    }
  }

  return [minElement, maxElement]
}
