import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { map } from './map.js'

describe('map', () => {
  it('accepts only iterables', () => {
    assert.throws(() => map({}, (v) => v).next(), TypeError)
    assert.throws(() => map(10, (v) => v).next(), TypeError)
    assert.doesNotThrow(() => map('abc', (v) => v).next())
    assert.doesNotThrow(() => map([1, 2, 3], (v) => v).next())
  })

  it('transformer is called once for every value', () => {
    const transformer = mock.fn((v) => v)
    const source = [1, 2, 3]
    const result = [...map(source, transformer)]
    const calls = transformer.mock.calls
    assert.deepStrictEqual(result, source)
    assert.deepStrictEqual(calls.length, 3)
    assert.deepStrictEqual(calls[0].arguments, [1])
    assert.deepStrictEqual(calls[0].result, 1)
  })

  it('transformer is never called for empty iterables', () => {
    const transformer = mock.fn((v) => v)
    const result = [...map([], transformer)]
    const calls = transformer.mock.calls
    assert.deepStrictEqual(result, [])
    assert.deepStrictEqual(calls.length, 0)
  })
})
