import assert from 'node:assert'
import { describe, it } from 'node:test'
import { min } from './min.js'

describe('min', () => {
  it('accepts only iterables', () => {
    assert.throws(() => min({}), TypeError)
    assert.throws(() => min(10), TypeError)
    assert.doesNotThrow(() => min('abc'))
    assert.doesNotThrow(() => min([1, 2, 3]))
  })

  it('returns the smallest value', () => {
    assert.strictEqual(min('abc'), 'a')
    assert.strictEqual(min([3, 2, 1]), 1)
    assert.strictEqual(min([]), undefined)
  })

  it('can use a transform key before comparing', () => {
    assert.strictEqual(min('ABc'), 'A')
    assert.strictEqual(min([-3, 2, -1], n => n * n), -1)
    assert.deepStrictEqual(min([
      { name: 'foo', score: 2 },
      { name: 'bar', score: 1 },
      { name: 'baz', score: 3 }
    ], o => o.score), { name: 'bar', score: 1 })
  })
})
