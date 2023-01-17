import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { filter } from './filter.js'

describe('filter', () => {
  it('accepts only iterables', () => {
    assert.throws(() => filter({}, Boolean).next(), TypeError)
    assert.throws(() => filter(10, Boolean).next(), TypeError)
    assert.doesNotThrow(() => filter('abc', Boolean).next())
    assert.doesNotThrow(() => filter([1, 2, 3], Boolean).next())
  })

  it('returns all values that pass the test', () => {
    assert.deepStrictEqual([...filter('abc', (c) => c === 'b')], ['b'])
    assert.deepStrictEqual([...filter('abbcb', (c) => c === 'b')], ['b', 'b', 'b'])
    assert.deepStrictEqual([...filter('xyz', (c) => c === 'b')], [])
  })

  it('never calls the predicate if the source is empty', () => {
    const check = mock.fn((c) => c === 'b')

    const result = [...filter('', check)]
    const calls = check.mock.calls

    assert.deepStrictEqual(result, [])
    assert.strictEqual(calls.length, 0)
  })
})
