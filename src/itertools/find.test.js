import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { find } from './find.js'

describe('find', () => {
  it('accepts only iterables', () => {
    assert.throws(() => find({}), TypeError)
    assert.throws(() => find(10), TypeError)
    assert.doesNotThrow(() => find('abc'))
    assert.doesNotThrow(() => find([1, 2, 3]))
  })

  it('returns the object if found', () => {
    assert.strictEqual(find('abc', (c) => c === 'b'), 'b')
    assert.strictEqual(find('abc', (c) => c === 'x'), undefined)
  })

  it('returns undefined for an empty source', () => {
    assert.strictEqual(find('', (c) => c === 'a'), undefined)
  })

  it('terminates as soon as value that does pass the test is found', () => {
    const check = mock.fn((c) => c === 'b')

    const result = find('aabb', check)
    const calls = check.mock.calls

    assert.deepStrictEqual(result, 'b')
    assert.strictEqual(calls.length, 3)
    assert.strictEqual(calls[0].result, false)
    assert.strictEqual(calls[1].result, false)
    assert.strictEqual(calls[2].result, true)
  })
})
