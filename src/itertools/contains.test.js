import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { contains } from './contains.js'

describe('contains', () => {
  it('accepts only iterables', () => {
    assert.throws(() => contains({}, 'x'), TypeError)
    assert.throws(() => contains(10, 'x'), TypeError)
    assert.doesNotThrow(() => contains('abc', 'x'))
    assert.doesNotThrow(() => contains([1, 2, 3], 'x'))
  })

  it('returns true if a matching value is found', () => {
    assert.strictEqual(contains('abc', 'b'), true)
    assert.strictEqual(contains('abbbc', 'b'), true)
    assert.strictEqual(contains('abc', 'x'), false)
  })

  it('performs strict equality checks', () => {
    const [a, b, c] = [{ v: 1 }, { v: 2 }, { v: 3 }]
    assert.strictEqual(contains([a, b, c], a), true)
    assert.strictEqual(contains([a, b, c], { v: 1 }), false)
  })

  it('returns as soon as a matching value is found', () => {
    const iterator = {
      values: [1, 2, 2, 3, 3, 3],
      next () {
        if (this.values.length) {
          return { value: this.values.shift(), done: false }
        } else {
          return { value: undefined, done: true }
        }
      }
    }
    const iterable = { [Symbol.iterator]: () => iterator }

    mock.method(iterator, 'next')

    const result = contains(iterable, 3)
    const calls = iterator.next.mock.calls

    assert.strictEqual(result, true)
    assert.strictEqual(calls.length, 4)
    assert.deepStrictEqual(calls[0].result, { value: 1, done: false })
    assert.deepStrictEqual(calls[1].result, { value: 2, done: false })
    assert.deepStrictEqual(calls[2].result, { value: 2, done: false })
    assert.deepStrictEqual(calls[3].result, { value: 3, done: false })
  })
})
