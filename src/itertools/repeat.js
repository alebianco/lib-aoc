/**
 * Returns a sequence producing the provided {@link value} for a {@link limit} amount of times.
 *
 * @example
 * repeat("a", 3); // returns ["a", "a", "a"]
 * @example
 * range("a", 0); // returns []
 * @example
 * range("a"); // returns ["a", "a", "a", ...]
 *
 * @template T
 * @param {T} value the value to repeat
 * @param {number} [limit=Number.POSITIVE_INFINITY] the number of times to repeat the provided value
 * @yields the provided value again, and again, and again ...
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link limit} is not a whole number or {@link Number.POSITIVE_INFINITY}
 */
export function * repeat (value, limit = Number.POSITIVE_INFINITY) {
  if (limit !== Number.POSITIVE_INFINITY && (!Number.isInteger(limit) || limit < 0)) {
    throw new TypeError(`Argument 'limit' should be a natural number, received ${limit} (${typeof limit}).`)
  }

  let count = limit
  while (count--) {
    yield value
  }
}
