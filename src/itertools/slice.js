import { isIterable } from './isIterable.js'
import { from } from './from.js'

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
 * @example
 * slice([1, 2, 3, 4, 5], 1, -2); // returns [2, 3]
 * @example
 * slice([1, 2, 3, 4, 5], 4, 1, -2); // returns [5, 3]
 *
 * @requires module:itertools.from
 * @requires module:itertools.isIterable
 *
 * @template T
 * @param {Iterable<T>} source where to take the elements from
 * @param {number} [start] number of elements to take before terminating the sequence, default to 0 when going forward, -1 when going backward
 * @param {number} [stop] number of elements to take before terminating the sequence
 * @param {number} [step=1] number of elements to take before terminating the sequence
 * @yields {T} the next value of the source
 * @returns {Generator<T, void, void>} the sequence generator
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 * @throws {TypeError} when {@link start} is not an integer number or undefined
 * @throws {TypeError} when {@link stop} is not an integer number or undefined
 * @throws {TypeError} when {@link step} is not an integer number or is equal to 0
 */
export function * slice (source, start = undefined, stop = undefined, step = 1) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }
  if (!Number.isInteger(start) && start !== undefined) {
    throw new TypeError(`Argument 'start' should be an integer number, received ${start} (${typeof start}).`)
  }
  if (!Number.isInteger(stop) && stop !== undefined) {
    throw new TypeError(`Argument 'stop' should be an integer number, received ${stop} (${typeof stop}).`)
  }
  if (!Number.isInteger(step) || step === 0) {
    throw new TypeError(`Argument 'step' should be a positive or negative integer, different from 0, received ${step} (${typeof step}).`)
  }

  if (step > 0) yield * forward(from(source), start, stop, step)
  else yield * backward(from(source), start, stop, step)
}

function * forward (source, start, stop, step) {
  start = start ?? 0

  if (start < 0) {
    // track total length of the original source
    let length = 0

    // buffer all values except the last `-start` values
    const buffer = []
    for (let element = source.next(); element.done === false; element = source.next()) {
      length++
      buffer.push(element.value)
      if (buffer.length > -start) {
        buffer.shift()
      }
    }

    // adjust `start` and `stop` to be positive
    start = Math.max(length + start, 0)
    if (stop === undefined) {
      stop = length
    } else if (stop >= 0) {
      stop = Math.min(stop, length)
    } else {
      stop = Math.max(length + stop, 0)
    }

    // regular slice of the buffer values
    const count = stop - start
    if (count > 0) {
      const it = from(buffer)
      for (let index = 0, element = it.next(); index < count && element.done === false; index++, element = it.next()) {
        // yield values at the right `step` interval
        if (index % step === 0) {
          yield element.value
        }
      }
    }
    // clear buffer
    buffer.length = 0
  } else if (stop !== undefined && stop < 0) {
    // we won't need values up to `start`
    for (let index = 0; index < start; index++) {
      const { done } = source.next()
      if (done) break
    }

    // slice while buffering and delay `-stop` values
    const buffer = []
    for (let index = 0, element = source.next(); element.done === false; index++, element = source.next()) {
      buffer.push(element.value)
      if (buffer.length > -stop) {
        const element = buffer.shift()
        // yield values at the right `step` interval
        if ((index + stop) % step === 0) {
          yield element
        }
      }
    }
    // clear buffer
    buffer.length = 0
  } else {
    stop = stop ?? Number.POSITIVE_INFINITY

    // regular slicing
    for (let index = 0, element = source.next(); element.done === false; index++, element = source.next()) {
      // yield values in the requested range at the right `step` interval
      if (index >= start && index < stop && (index - start) % step === 0) {
        yield element.value
      }
    }
  }
}

function * backward (source, start, stop, step) {
  start = start ?? -1

  if (stop !== undefined && stop < 0) {
    // track total length of the original source
    let length = 0

    // buffer (in reverse order) all values except the last `-stop-1`
    const buffer = []
    for (let index = 1, element = source.next(); element.done === false; index++, element = source.next()) {
      length = index
      buffer.unshift(element.value)
      if (buffer.length > (-stop - 1)) {
        buffer.pop()
      }
    }

    if (start >= 0) {
      // adjust `start` to be negative
      start = Math.min(start - length, -1)
    }

    // yield items from buffer up to `start` or end
    const it = from(buffer)
    for (let index = 0, element = it.next(); element.done === false; index--, element = it.next()) {
      if (index <= (start + 1) && (index + start) % step === 0) {
        // yield values in the requested range at the right `step` interval
        yield element.value
      }
    }
    // clear buffer
    buffer.length = 0
  } else {
    let it = source

    if (stop !== undefined) {
      // we won't need values up to `stop`
      for (let index = 0; index <= stop; index++) {
        const { done } = it.next()
        if (done) break
      }
    }

    if (start < 0) {
      // cache all the remaining values until the end, then adjust `start` to be positive
      const cache = Array.from(it)
      stop = 0
      start = start + cache.length + 1
      // now operate over the cached values
      it = from(cache)
    } else if (stop === undefined) {
      // we want values up to `start`
      stop = 0
      start = start + 1
    }

    if (start > stop) {
      const buffer = []
      for (let index = stop, element = it.next(); index < start && element.done === false; index++, element = it.next()) {
        if (index >= stop && (index - start + stop) % step === 0) {
          // buffer values (in reversed order) in the requested range at the right `step` interva
          buffer.unshift(element.value)
        }
      }
      // yield all values
      yield * buffer
      // clear buffer
      buffer.length = 0
    }
  }
}
