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
 * @param {Iterable<T>|Iterator<T>} value the iterable to get the iterator from
 * @returns {Iterator<T>} the iterator for the requested iterable
 *
 * @throws {TypeError} when the value provided is neither {@link Iterable} or {@link Iterator}
 */
export function from (value) {
  if (value != null && 'next' in Object(value) && typeof value.next === 'function') return value
  else return value[Symbol.iterator]()
}
