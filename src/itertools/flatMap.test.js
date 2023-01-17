import assert from 'node:assert'
import { describe, it, mock } from 'node:test'
import { flatMap } from './flatMap.js'

describe('flatMap', () => {
  it('accepts only iterables', () => {
    assert.throws(() => flatMap({}, (v) => [v]).next(), TypeError)
    assert.throws(() => flatMap(10, (v) => [v]).next(), TypeError)
    assert.doesNotThrow(() => flatMap('abc', (v) => [v]).next())
    assert.doesNotThrow(() => flatMap([1, 2, 3], (v) => [v]).next())
  })

  it('transformer is called once for every value', () => {
    const transformer = mock.fn((v) => [v, v])
    const source = [1, 2, 3]
    const result = [...flatMap(source, transformer)]
    const calls = transformer.mock.calls
    assert.deepStrictEqual(result, [1, 1, 2, 2, 3, 3])
    assert.deepStrictEqual(calls.length, 3)
    assert.deepStrictEqual(calls[0].arguments, [1])
    assert.deepStrictEqual(calls[0].result, [1, 1])
  })

  it('transformer is never called for empty iterables', () => {
    const transformer = mock.fn((v) => v)
    const result = [...flatMap([], transformer)]
    const calls = transformer.mock.calls
    assert.deepStrictEqual(result, [])
    assert.deepStrictEqual(calls.length, 0)
  })
})
