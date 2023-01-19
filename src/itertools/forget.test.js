import assert from 'node:assert'
import { describe, it } from 'node:test'
import { forget } from './forget.js'

describe('forget', () => {
  it('accepts only iterables', () => {
    assert.throws(() => forget({}, 2).next(), TypeError)
    assert.throws(() => forget(10, 2).next(), TypeError)
    assert.doesNotThrow(() => forget('abc', 2).next())
    assert.doesNotThrow(() => forget([1, 2, 3], 2).next())
  })

  it('can discard a zero or a positive number of elements', () => {
    assert.throws(() => forget([1, 2, 3], -2).next(), TypeError)
    assert.deepStrictEqual([...forget([1, 2, 3, 4, 5], 2)], [1, 2, 3])
    assert.deepStrictEqual([...forget([1, 2, 3], 0)], [1, 2, 3])
  })

  it('returns empty list when forgetting more items than available', () => {
    assert.deepStrictEqual([...forget([1, 2], 5)], [])
  })
})
