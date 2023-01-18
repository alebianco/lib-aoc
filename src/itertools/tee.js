import { from } from './from.js'
import { isIterable } from './isIterable.js'

/**
 * Returns {@link count} independent copies of the {@link source}.
 *
 * Will require some additional memory to store a copy of the values that have not yet been consumed by all the copies,
 * and a cursor for each copy. The memory requirement increases if only some copies are consumed.
 *
 * @example
 * tee([1, 2], 3); // returns [[Generator] {}, [Generator] {}, [Generator] {}]
 * @example
 * tee([1, 2]); // returns [[Generator] {}, [Generator] {}]
 * @example
 * tee([1, 2], 0); // returns []
 *
 * @requires module:itertools.from
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source the iterable to copy
 * @param {number} [count=2] number copies of the source to make
 * @returns {Array<Generator<T, void, void>>} a list of iterables that will emit the same values
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link count} is not a whole number
 */
export function tee (source, count = 2) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError(`Argument 'count' should be a natural number, received ${count} (${typeof count}).`)
  }

  const it = from(source)

  const values = []
  const cursors = []

  const prune = () => {
    const min = cursors.reduce((min, cursor) => Math.min(min, cursor.index), Number.POSITIVE_INFINITY)
    if (min > 0) {
      for (const cursor of cursors) {
        cursor.index -= min
      }
      values.splice(0, min)
    }
  }

  function * generator (cursor) {
    while (true) {
      if (cursor.index === values.length) {
        values.push(it.next())
      }

      const result = values[cursor.index++]
      prune()
      if (result.done) {
        return result.value
      } else {
        yield result.value
      }
    }
  }

  return Array.from({ length: count }, () => {
    const cursor = { index: 0 }
    cursors.push(cursor)
    return generator(cursor)
  })
}
