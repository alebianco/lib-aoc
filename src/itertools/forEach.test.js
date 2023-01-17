import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { forEach } from './forEach.js'

describe('forEach', () => {
  it('accepts only iterables', () => {
    assert.throws(() => forEach({}, (_) => {}), TypeError)
    assert.throws(() => forEach(10, (_) => {}), TypeError)
    assert.doesNotThrow(() => forEach('abc', (_) => {}))
    assert.doesNotThrow(() => forEach([1, 2, 3], (_) => {}))
  })

  it('calls the action for every value', () => {
    const noop = mock.fn((_) => {})

    forEach([1, 2, 3], noop)
    const calls = noop.mock.calls

    assert.strictEqual(calls.length, 3)
    assert.deepStrictEqual(calls[0].arguments, [1])
    assert.deepStrictEqual(calls[1].arguments, [2])
    assert.deepStrictEqual(calls[2].arguments, [3])
  })

  it('never calls action for empty sequences', () => {
    const noop = mock.fn((_) => {})

    forEach([], noop)
    const calls = noop.mock.calls

    assert.strictEqual(calls.length, 0)
  })
})
