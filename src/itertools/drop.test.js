import assert from 'node:assert'
import { describe, it } from 'node:test'
import { drop } from './drop.js'

describe('drop', () => {
  it('accepts only iterables', () => {
    assert.throws(() => drop({}, 2).next(), TypeError)
    assert.throws(() => drop(10, 2).next(), TypeError)
    assert.doesNotThrow(() => drop('abc', 2).next())
    assert.doesNotThrow(() => drop([1, 2, 3], 2).next())
  })

  it('can discard a zero or a positive number of elements', () => {
    assert.throws(() => drop([1, 2, 3], -2).next(), TypeError)
    assert.deepStrictEqual([...drop([1, 2, 3, 4, 5], 2)], [3, 4, 5])
    assert.deepStrictEqual([...drop([1, 2, 3], 0)], [1, 2, 3])
  })

  it('returns empty list when dropping more items than available', () => {
    assert.deepStrictEqual([...drop([1, 2], 5)], [])
  })
})
