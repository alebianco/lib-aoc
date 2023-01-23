import assert from 'node:assert'
import { describe, it } from 'node:test'
import { max } from './max.js'

describe('max', () => {
  it('accepts only iterables', () => {
    assert.throws(() => max({}), TypeError)
    assert.throws(() => max(10), TypeError)
    assert.doesNotThrow(() => max('abc'))
    assert.doesNotThrow(() => max([1, 2, 3]))
  })

  it('returns the smallest value', () => {
    assert.strictEqual(max('abc'), 'c')
    assert.strictEqual(max([3, 2, 1]), 3)
    assert.strictEqual(max([]), undefined)
  })

  it('can use a transform key before comparing', () => {
    assert.strictEqual(max('ABc'), 'c')
    assert.strictEqual(max([-3, 2, -1], n => n * n), -3)
    assert.deepStrictEqual(max([
      { name: 'foo', score: 2 },
      { name: 'bar', score: 1 },
      { name: 'baz', score: 3 }
    ], o => o.score), { name: 'baz', score: 3 })
  })
})
