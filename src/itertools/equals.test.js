import assert from 'node:assert'
import { describe, it } from 'node:test'
import { equal } from './equal.js'

describe('equal', () => {
  it('accepts only iterables', () => {
    assert.throws(() => equal({}), TypeError)
    assert.throws(() => equal(10), TypeError)
    assert.doesNotThrow(() => equal('abc'))
    assert.doesNotThrow(() => equal([1, 2, 3]))
  })

  it('returns true if all sequence values are equal', () => {
    assert.strictEqual(equal('abc', 'abc', 'abc'), true)
    assert.strictEqual(equal('abc', ['a', 'b', 'c']), true)
    assert.strictEqual(equal('abc', 'acb'), false)
  })

  it('compares values with strict equality', () => {
    assert.strictEqual(equal([{}], [{}]), false)
  })

  it('returns true only if all sequences are of the same length', () => {
    assert.strictEqual(equal('abc', 'abcd'), false)
    assert.strictEqual(equal('abcd', 'abc'), false)
  })

  it('returns immediately if none, or one sequence is passed', () => {
    assert.strictEqual(equal('abc'), true)
    assert.strictEqual(equal(), true)
  })
})
