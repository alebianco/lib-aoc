
/**
 * Any object that respects the iterable protocol signature.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol iterable protocol | MDN}
 *
 * @private Overload of the standard type, hack to circumvent JSDoc restrictions and use a well known symbol as a property name.
 */
// @ts-expect-error
type Iterable<T> = { [Symbol.iterator]():Iterator<T> }
