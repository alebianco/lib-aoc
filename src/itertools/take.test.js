import assert from 'node:assert'
import { describe, it } from 'node:test'
import { take } from './take.js'

describe('take', () => {
  it('accepts only iterables', () => {
    assert.throws(() => take({}, 2).next(), TypeError)
    assert.throws(() => take(10, 2).next(), TypeError)
    assert.doesNotThrow(() => take('abc', 2).next())
    assert.doesNotThrow(() => take([1, 2, 3], 2).next())
  })

  it('can take a zero or a positive number of elements', () => {
    assert.throws(() => [...take([1, 2, 3], -2)], TypeError)
    assert.deepStrictEqual([...take([1, 2, 3], 0)], [])
    assert.deepStrictEqual([...take([1, 2, 3], 2)], [1, 2])
  })

  it('should take all source elements if more are requested', () => {
    assert.deepStrictEqual([...take([1], 2)], [1])
  })
})
