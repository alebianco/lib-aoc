import assert from 'node:assert'
import { describe, it } from 'node:test'
import { toArray } from './toArray.js'

describe('toArray', () => {
  it('accepts only iterables', () => {
    assert.throws(() => toArray({}), TypeError)
    assert.throws(() => toArray(10), TypeError)
    assert.doesNotThrow(() => toArray('abc'))
    assert.doesNotThrow(() => toArray([1, 2, 3]))
  })

  it('returns an array of values', () => {
    const [a, b, c] = [{}, {}, {}]
    assert.deepStrictEqual(toArray('abc'), ['a', 'b', 'c'])
    assert.deepStrictEqual(toArray(''), [])
    assert.strictEqual(toArray([a, b, c]).at(0), a)
  })
})
