import { isIterable } from './isIterable.js'

/**
 * Returns a sequence of selected elements from the {@link source}.
 *
 * If {@link start} is non-zero, then elements from the source are skipped until start is reached. Afterward, elements are returned
 * consecutively unless {@link step} is set higher than one which results in items being skipped. The sequence continues until the
 * {@link stop} position is reached or the source is exhausted.
 *
 * @example
 * slice([1, 2, 3, 4, 5], 1); // returns [2, 3, 4, 5]
 * @example
 * slice([1, 2, 3, 4, 5], 1, 4); // returns [2, 3, 4]
 * @example
 * slice([1, 2, 3, 4, 5], 1, 4, 2); // returns [2, 4]
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the elements from
 * @param {number} [start=0] number of elements to take before terminating the sequence
 * @param {number} [stop=Number.POSITIVE_INFINITY] number of elements to take before terminating the sequence
 * @param {number} [step=1] number of elements to take before terminating the sequence
 * @yields {T} the next value of the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link start} is not a whole number
 * @throws {TypeError} when {@link stop} is not a whole number
 * @throws {TypeError} when {@link step} is not a whole number or is equal to 0
 */
export function * slice (source, start = 0, stop = Number.POSITIVE_INFINITY, step = 1) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(start) || start < 0) {
    throw new TypeError(`Argument 'limit' should be a whole number, received ${start} (${typeof start}).`)
  }
  if (stop !== Number.POSITIVE_INFINITY && (!Number.isInteger(stop) || stop < 0)) {
    throw new TypeError(`Argument 'stop' should be a whole number, received ${stop} (${typeof stop}).`)
  }
  if (!Number.isInteger(step) || step <= 0) {
    throw new TypeError(`Argument 'step' should be a whole number different from 0, received ${step} (${typeof step}).`)
  }

  let index = 0
  for (const value of source) {
    if (index >= start && index < stop && (index - start) % step === 0) {
      yield value
    }
    index++
  }
}
