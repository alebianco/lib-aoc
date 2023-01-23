import assert from 'node:assert'
import { describe, it } from 'node:test'
import { minmax } from './minmax.js'

describe('minmax', () => {
  it('accepts only iterables', () => {
    assert.throws(() => minmax({}), TypeError)
    assert.throws(() => minmax(10), TypeError)
    assert.doesNotThrow(() => minmax('abc'))
    assert.doesNotThrow(() => minmax([1, 2, 3]))
  })

  it('returns the smallest value', () => {
    assert.deepStrictEqual(minmax('abc'), ['a', 'c'])
    assert.deepStrictEqual(minmax([3, 2, 1]), [1, 3])
    assert.deepStrictEqual(minmax([]), [undefined, undefined])
  })

  it('can use a transform key before comparing', () => {
    assert.deepStrictEqual(minmax('ABc'), ['A', 'c'])
    assert.deepStrictEqual(minmax([-3, 2, -1], n => n * n), [-1, -3])
    assert.deepStrictEqual(minmax([
      { name: 'foo', score: 2 },
      { name: 'bar', score: 1 },
      { name: 'baz', score: 3 }
    ], o => o.score), [{ name: 'bar', score: 1 }, { name: 'baz', score: 3 }])
  })
})
