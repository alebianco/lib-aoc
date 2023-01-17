import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { every } from './every.js'

describe('every', () => {
  it('accepts only iterables', () => {
    assert.throws(() => every({}), TypeError)
    assert.throws(() => every(10), TypeError)
    assert.doesNotThrow(() => every('abc'))
    assert.doesNotThrow(() => every([1, 2, 3]))
  })

  it('uses a truthy check by default', () => {
    assert.strictEqual(every([1, 'a', []]), true)
    assert.strictEqual(every([0, '', null]), false)
  })

  it('returns true if all values pass the test', () => {
    assert.strictEqual(every([0, 2, 4], (n) => n % 2 === 0), true)
    assert.strictEqual(every('aaa', (c) => c === 'a'), true)
    assert.strictEqual(every('aba', (c) => c === 'a'), false)
  })

  it('returns true if the source emits no values', () => {
    assert.strictEqual(every([], (n) => n % 2 === 0), true)
  })

  it('terminates as soon as value that does not pass the test is found', () => {
    const check = mock.fn((c) => c === 'a')

    const result = every('aabaaa', check)
    const calls = check.mock.calls

    assert.deepStrictEqual(result, false)
    assert.strictEqual(calls.length, 3)
    assert.strictEqual(calls[0].result, true)
    assert.strictEqual(calls[1].result, true)
    assert.strictEqual(calls[2].result, false)
  })
})
