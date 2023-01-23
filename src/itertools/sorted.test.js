import assert from 'node:assert'
import { describe, it } from 'node:test'
import { sorted } from './sorted.js'

describe('sorted', () => {
  it('accepts only iterables', () => {
    assert.throws(() => sorted({}).next(), TypeError)
    assert.throws(() => sorted(10).next(), TypeError)
    assert.doesNotThrow(() => sorted('abc').next())
    assert.doesNotThrow(() => sorted([1, 2, 3]).next())
  })

  it('sorts lexicographically', () => {
    assert.deepStrictEqual([...sorted([2, 3, 1, 4, 4])], [1, 2, 3, 4, 4])
    assert.deepStrictEqual([...sorted([2, 3, 1])], [1, 2, 3])
    assert.deepStrictEqual([...sorted('bca')], ['a', 'b', 'c'])
  })

  it('can specify comparator function', () => {
    assert.deepStrictEqual([...sorted('äBč', (a, b) => a.localeCompare(b))], ['ä', 'B', 'č'])
  })

  it('can reverse result', () => {
    assert.deepStrictEqual([...sorted([2, 3, 1], undefined, true)], [3, 2, 1])
  })
})
