/**
 * Returns an iterator from the provided iterable. Returns the object itself if it's already an iterator.
 *
 * This can be used to manually get an iterator from any object respecting the iterable protocol signature.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol iterable protocol | MDN}
 *
 * @example
 * const it = from([1, 2, 3]);
 * it.next().value; // returns 1
 *
 * @example
 * from([1, 2, 3]); // returns Array Iterator {}
 * @example
 * from("abc"); // returns StringIterator
 * @example
 * from(true); // throws TypeError
 *
 * @template T
 * @param {Iterable<T>} value the iterable to get the iterator from
 * @returns {IterableIterator<T>} the iterator for the requested iterable
 *
 * @throws {TypeError} when the value provided is not an {@link Iterable}
 */
export function from (value) {
  return value[Symbol.iterator]()
}
