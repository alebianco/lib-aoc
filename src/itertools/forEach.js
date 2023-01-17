import { isIterable } from './isIterable.js'

/**
 * Performs an {@link action} on every value emitted from the {@link @source}.
 *
 * The source will be consumed in the process.
 *
 * @example
 * forEach([1, 2, 3], (n) => console.log(n));
 *
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the values from
 * @param {function(value:T):void} action a function to execute for each value
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link action} is not a function
 */
export function forEach (source, action) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  for (const element of source) {
    action(element)
  }
}
