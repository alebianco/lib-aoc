import { count } from './count.js'

/**
 * Generates an infinite sequence of all natural numbers.
 *
 * @example
 * naturals(); // returns [0, 1, 2, ...]
 *
 * @requires module:itertools.count
 *
 * @yields {number} the next natural number
 * @returns {Generator<number, void, void>} the sequence generator
 */
export function naturals () {
  return count(0, 1)
}

/**
 * Generates an infinite sequence of all natural even numbers.
 *
 * @example
 * evens(); // returns [0, 2, 4, ...]
 *
 * @requires module:itertools.count
 *
 * @yields {number} the next natural even number
 * @returns {Generator<number, void, void>} the sequence generator
 */
export function evens () {
  return count(0, 2)
}

/**
 * Generates an infinite sequence of all natural odd numbers.
 *
 * @example
 * odds(); // returns [1, 3, 5, ...]
 *
 * @requires module:itertools.count
 *
 * @yields {number} the next natural odd number
 * @returns {Generator<number, void, void>} the sequence generator
 */
export function odds () {
  return count(1, 2)
}
