import assert from 'node:assert'
import { describe, it } from 'node:test'
import { enumerate } from './enumerate.js'

describe('enumerate', () => {
  it('accepts only iterables', () => {
    assert.throws(() => enumerate({}).next(), TypeError)
    assert.throws(() => enumerate(10).next(), TypeError)
    assert.doesNotThrow(() => enumerate('abc').next())
    assert.doesNotThrow(() => enumerate([1, 2, 3]).next())
  })

  it('can take a whole number to start from', () => {
    assert.throws(() => enumerate([1, 2, 3], Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => enumerate([1, 2, 3], -1).next(), TypeError)
    assert.throws(() => enumerate([1, 2, 3], 1.5).next(), TypeError)
    assert.doesNotThrow(() => enumerate([1, 2, 3]).next())
    assert.doesNotThrow(() => enumerate([1, 2, 3], 10).next())
  })

  it('returns a sequence of pairs with index and the element value', () => {
    assert.deepStrictEqual([...enumerate('abc')], [[0, 'a'], [1, 'b'], [2, 'c']])
    assert.deepStrictEqual([...enumerate('abc', 2)], [[2, 'a'], [3, 'b'], [4, 'c']])
  })

  it('returns an empty iterable for an empty source', () => {
    assert.deepStrictEqual([...enumerate([])], [])
  })
})
