import assert from 'node:assert'
import { describe, it } from 'node:test'
import { from } from './from.js'

describe('from', () => {
  it('accepts only iterables or iterators', () => {
    assert.throws(() => from({}).next(), TypeError)
    assert.throws(() => from(10).next(), TypeError)
    assert.doesNotThrow(() => from('abc').next())
    assert.doesNotThrow(() => from([1, 2, 3]).next())
    assert.doesNotThrow(() => from([1, 2, 3][Symbol.iterator]()).next())
  })

  it('returns the same object if it is already an iterator', () => {
    const it = [1, 2, 3][Symbol.iterator]()
    assert.strictEqual(from(it), it)
  })
})
