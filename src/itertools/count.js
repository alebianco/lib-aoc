/**
 * Generates an infinite sequence of rational numbers, starting from {@link start} and progressing by {@link step}.
 *
 * @example
 * count(); // returns [0, 1, 2, ...]
 * @example
 * count(10); // returns [10, 11, 12, ...]
 * @example
 * count(10, 2); // returns [10, 12, 14, ...]
 * @example
 * count(2, -1); // returns [2, 1, 0, -1, ...]
 *
 * @param {number} [start=0] lower bound of the sequence
 * @param {number} [step=1] amount to increment for each value
 * @yields {number} the next value of the sequence
 * @returns {Generator<number, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link start} is not a rational number
 * @throws {TypeError} when {@link step} is not a rational number or is equal to 0
 */
export function * count (start = 0, step = 1) {
  if (!Number.isFinite(start)) {
    throw new TypeError(`Argument 'start' should be a rational number, received ${start} (${typeof start}).`)
  }
  if (!Number.isFinite(step) || step === 0) {
    throw new TypeError(`Argument 'step' should be a rational number different from 0, received ${step} (${typeof step}).`)
  }

  let n = start
  while (true) {
    yield n
    n += step
  }
}
