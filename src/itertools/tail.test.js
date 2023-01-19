import assert from 'node:assert'
import { describe, it } from 'node:test'
import { tail } from './tail.js'

describe('tail', () => {
  it('accepts only iterables', () => {
    assert.throws(() => tail({}, 2).next(), TypeError)
    assert.throws(() => tail(10, 2).next(), TypeError)
    assert.doesNotThrow(() => tail('abc', 2).next())
    assert.doesNotThrow(() => tail([1, 2, 3], 2).next())
  })

  it('can tail a zero or a positive number of elements', () => {
    assert.throws(() => [...tail([1, 2, 3], -2)], TypeError)
    assert.deepStrictEqual([...tail([1, 2, 3], 0)], [])
    assert.deepStrictEqual([...tail([1, 2, 3], 2)], [2, 3])
  })

  it('should tail all source elements if more are requested', () => {
    assert.deepStrictEqual([...tail([1], 2)], [1])
  })
})
