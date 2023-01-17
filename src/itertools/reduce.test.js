import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { reduce } from './reduce.js'

describe('reduce', () => {
  it('accepts only iterables', () => {
    assert.throws(() => reduce({}, (a, v) => a + v), TypeError)
    assert.throws(() => reduce(10, (a, v) => a + v), TypeError)
    assert.doesNotThrow(() => reduce('abc', (a, v) => a + v))
    assert.doesNotThrow(() => reduce([1, 2, 3], (a, v) => a + v))
  })

  it('processed all elements in the list', () => {
    assert.strictEqual(reduce([1, 2, 3, 4], (a, v) => a + v), 10)
    assert.strictEqual(reduce([1, 2, 3, 4], (a, v) => a * v), 24)
  })

  it('can start from an initial value', () => {
    assert.strictEqual(reduce([1, 2, 3, 4], (a, v) => a + v, 2), 12)
    assert.strictEqual(reduce([1, 2, 3, 4], (a, v) => a * v, 2), 48)
  })

  it('returns undefined (or the initial value) when the sequence is empty', () => {
    assert.strictEqual(reduce([], (a, v) => a + v), undefined)
    assert.strictEqual(reduce([], (a, v) => a + v, 1), 1)
  })

  it('the accumulator is updated at every value', () => {
    const sum = mock.fn((a, v) => v + a)

    const result = reduce([1, 2, 3], sum)
    const calls = sum.mock.calls

    assert.deepStrictEqual(result, 6)
    assert.strictEqual(calls.length, 2)
    assert.deepStrictEqual(calls[0].arguments, [1, 2])
    assert.strictEqual(calls[0].result, 3)
    assert.deepStrictEqual(calls[1].arguments, [3, 3])
    assert.strictEqual(calls[1].result, 6)
  })
})
