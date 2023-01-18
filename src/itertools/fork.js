/**
 * An Iterable whose Iterators can be forked.
 *
 * Does not implement `return()` and `throw()` methods. The `next()` method cannot accept values, in an attempt to ensure the reproducibility of emitted values across forks.
 *
 * @template T
 * @typedef {IterableIterator<T>} ForkableIterator
 */

import { from } from './from.js'
import { isIterable } from './isIterable.js'

/**
 * @private
 * @type {symbol}
 */
const forkSymbol = Symbol('fork')

/**
 * @private
 * @type {symbol}
 */
const savedResultsSymbol = Symbol('savedResults')

/**
 * Returns a {@link ForkableIterator} from the provided {@link source}, which has the same API as Iterable, but its iterators can be forked.
 *
 * To create a fork use the {@link fork} function. The source must not be read from directly, as any forks will miss the values.
 *
 * Be aware that if you have a fork that is not consuming values as it gets further and further behind more memory will be used. Make sure you null out references to forks that you no longer need to allow garbage collection to occur.
 *
 * @template T
 * @param {Iterable<T>} source the original iterable to make forkable
 * @returns {ForkableIterator<T>} the forkable iterable
 *
 * @throws {TypeError} when {@link source} is not an {@link Iterable}
 */
export function makeForkable (source) {
  if (!isIterable(source)) {
    throw new TypeError(`Argument 'source' should be iterable, received ${source} (${typeof source}).`)
  }

  const it = from(source)

  const callbackRegistry = new Set()
  const finalizationRegistry = new FinalizationRegistry((onResultCallback) => callbackRegistry.delete(onResultCallback))

  const readSource = () => {
    const result = it.next()
    callbackRegistry.forEach((onResultCallback) => onResultCallback(result))
  }

  /**
   * @template T
   * @param {T[]} savedResults
   * @returns {IterableIterator<T>}
   */
  const makeFork = (savedResults) => {
    /**
     * @template T
     * @type {ForkableIterator<T>}
     */
    const iterator = {
      /**
       * @returns {ForkableIterator<T>}
       */
      [Symbol.iterator] () {
        return this
      },
      /**
       * @param {T} value
       * @returns {IteratorResult<T>}
       */
      next (value) {
        if (value !== undefined) {
          throw new TypeError('ForkableIterator#next() cannot take a value')
        }
        const savedResults = this[savedResultsSymbol]
        if (!savedResults.length) {
          readSource()
        }
        return savedResults.shift()
      }
    }

    Object.defineProperty(iterator, forkSymbol, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: () => makeFork(iterator[savedResultsSymbol])
    })

    Object.defineProperty(iterator, savedResultsSymbol, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: savedResults.slice(0)
    })

    const ref = new WeakRef(iterator)

    /**
     * @template T
     * @param {T} result
     */
    const onResultCallback = (result) => {
      const maybeIterator = ref.deref()
      maybeIterator?.[savedResultsSymbol].push(result)
    }

    finalizationRegistry.register(iterator, onResultCallback)
    callbackRegistry.add(onResultCallback)

    return iterator
  }

  return makeFork([])
}

/**
 * Create a fork of the provided {@link ForkableIterator} at the current point.
 *
 * @template T
 * @param {ForkableIterator<T>} source the iterator to fork
 * @returns {ForkableIterator<T>} a fork of the source at its current point
 */
export function fork (source) {
  if (source !== null && !(forkSymbol in Object(source))) {
    throw new TypeError(`Argument 'source' should be a ForkableIterator, received ${source} (${typeof source}).`)
  }
  return source[forkSymbol]()
}
