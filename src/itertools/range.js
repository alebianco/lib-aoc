import { count } from './count.js'
import { take } from './take.js'

/**
 * Generates an infinite sequence of rational numbers, starting from {@link startOrLength}, progressing by {@link step} and stopping before {@link stop}.
 *
 * For a positive {@link step}, the generator will keep producing values `n` as long as the {@link stop} condition `n < stop` is satisfied.
 * For a negative {@link step}, the generator will keep producing values `n` as long as the {@link stop} condition `n > stop` is satisfied.
 *
 * The terminal value is not included in the sequence, unless the {@link inclusive} argument is used to change the default behaviour.
 * The produced sequence will be empty if the first value to produce already does not meet the {@link stop} condition.
 *
 * `range(n)` is a convenient shorthand for `range(0, n)`.
 *
 * @example
 * range(0, 3); // returns [0, 1, 2]
 * @example
 * range(0, 3, 2); // returns [0, 2]
 * @example
 * range(3, 0, -1); // returns [3, 2, 1]
 * @example
 * range(0, 3, 1, true); // returns [0, 1, 2, 3]
 * @example
 * range(3); // returns [0, 1, 2]
 *
 * @requires module:itertools.count
 * @requires module:itertools.take
 *
 * @param {number} startOrLength lower bound of the range, inclusive; Number of values in the range if stop is `undefined`
 * @param {number} [stop] upper bound of the range, esclusive
 * @param {number} [step=1] progress step of the sequence, must different from 0
 * @param {boolean} [inclusive=false] controls whether to make the upper bound inclusive or not
 * @yields {number} the next value of the sequence
 * @returns {Generator<number, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link startOrLength} is not a rational number
 * @throws {TypeError} when {@link stop} is defined and is not a rational number
 * @throws {TypeError} when {@link step} is not a rational number or is equal to 0
 */
export function * range (startOrLength, stop = undefined, step = 1, inclusive = false) {
  if (!Number.isFinite(startOrLength)) {
    throw new TypeError(`Argument 'from' should be a rational number, received ${startOrLength} (${typeof startOrLength}).`)
  }
  if (stop !== undefined && !Number.isFinite(stop)) {
    throw new TypeError(`Argument 'to' should be a rational number, received ${stop} (${typeof stop}).`)
  }
  if (!Number.isFinite(step) || step === 0) {
    throw new TypeError(`Argument 'step' should be a rational number different from 0, received ${step} (${typeof step}).`)
  }

  if (stop === undefined) {
    stop = startOrLength
    startOrLength = 0
  }

  const sequence = count(startOrLength, step)
  const n = Math.max(0, Math.floor((stop - startOrLength) / step) + (inclusive ? 1 : 0))

  yield * take(sequence, n)
}
