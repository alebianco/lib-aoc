import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { some } from './some.js'

describe('some', () => {
  it('accepts only iterables', () => {
    assert.throws(() => some({}), TypeError)
    assert.throws(() => some(10), TypeError)
    assert.doesNotThrow(() => some('abc'))
    assert.doesNotThrow(() => some([1, 2, 3]))
  })

  it('uses a truthy check by default', () => {
    assert.strictEqual(some([1, 'a', []]), true)
    assert.strictEqual(some([0, '', null]), false)
  })

  it('returns true if any values pass the test', () => {
    assert.strictEqual(some([1, 2, 3], (n) => n % 2 === 0), true)
    assert.strictEqual(some('abc', (c) => c === 'b'), true)
    assert.strictEqual(some('def', (c) => c === 'a'), false)
  })

  it('returns false if the source emits no values', () => {
    assert.strictEqual(some([], (n) => n % 2 === 0), false)
  })

  it('terminates as soon as value that pass the test is found', () => {
    const check = mock.fn((c) => c === 'a')

    const result = some('bbabb', check)
    const calls = check.mock.calls

    assert.deepStrictEqual(result, true)
    assert.strictEqual(calls.length, 3)
    assert.strictEqual(calls[0].result, false)
    assert.strictEqual(calls[1].result, false)
    assert.strictEqual(calls[2].result, true)
  })
})
