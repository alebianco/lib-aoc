import assert from 'node:assert'
import { describe, it } from 'node:test'
import { slice } from './slice.js'
import { naturals } from './numbers.js'
import { take } from './take.js'

describe('slice', () => {
  it('accepts only iterables', () => {
    assert.throws(() => slice({}).next(), TypeError)
    assert.throws(() => slice(10).next(), TypeError)
    assert.doesNotThrow(() => slice('abc').next())
    assert.doesNotThrow(() => slice([1, 2, 3]).next())
  })

  it('accepts a whole number as start position', () => {
    assert.throws(() => slice('abc', -1).next(), TypeError)
    assert.throws(() => slice('abc', 1.5).next(), TypeError)
    assert.throws(() => slice('abc', Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', 1).next())
  })

  it('accepts a whole number as stop position', () => {
    assert.throws(() => slice('abc', 0, -1).next(), TypeError)
    assert.throws(() => slice('abc', 0, 1.5).next(), TypeError)
    assert.throws(() => slice('abc', 0, Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', 0, 1).next())
  })

  it('accepts a natural number as step', () => {
    assert.throws(() => slice('abc', 0, 1, -1).next(), TypeError)
    assert.throws(() => slice('abc', 0, 1, 1.5).next(), TypeError)
    assert.throws(() => slice('abc', 0, 1, Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', 0, 1, 1).next())
  })

  it('returns an empty sequence if stop is lower than start', () => {
    assert.deepStrictEqual([...slice('abc', 2, 1)], [])
  })

  it('can skip the initial values', () => {
    assert.deepStrictEqual([...slice('abcdef', 3)], ['d', 'e', 'f'])
  })

  it('can stop before the source end', () => {
    assert.deepStrictEqual([...slice('abcdef', 0, 3)], ['a', 'b', 'c'])
  })

  it('can skip some values', () => {
    assert.deepStrictEqual([...slice(take(naturals(), 100), 10, 50, 7)], [10, 17, 24, 31, 38, 45])
  })
})
