import assert from 'node:assert'
import { describe, it } from 'node:test'
import { range } from './range.js'

describe('range', () => {
  it('can build positive sequences', () => {
    assert.deepStrictEqual([...range(0, 3)], [0, 1, 2])
    assert.deepStrictEqual([...range(2, 5)], [2, 3, 4])
  })

  it('can build negative sequences', () => {
    assert.deepStrictEqual([...range(0, -3, -1)], [0, -1, -2])
    assert.deepStrictEqual([...range(10, 5, -1)], [10, 9, 8, 7, 6])
  })

  it('can make the upper bound inclusive', () => {
    assert.deepStrictEqual([...range(0, 3, 1, true)], [0, 1, 2, 3])
    assert.deepStrictEqual([...range(0, -3, -1, true)], [0, -1, -2, -3])
  })

  it('can increment by the requested amount', () => {
    assert.deepStrictEqual([...range(0, 2, 0.5)], [0, 0.5, 1, 1.5])
    assert.deepStrictEqual([...range(0, -1, -0.5)], [0, -0.5])
  })

  it('has a shortcut to create n-sized ranges', () => {
    assert.deepStrictEqual(range(10).next().value, 0)
    assert.deepStrictEqual([...range(10)].length, 10)
  })

  it('might return empty ranges', () => {
    assert.deepStrictEqual([...range(0, 0)], [])
    assert.deepStrictEqual([...range(0)], [])
    assert.deepStrictEqual([...range(0, 10, -1)], [])
    assert.deepStrictEqual([...range(0, -10)], [])
  })

  it('can only start from a rational number', () => {
    assert.throws(() => range(Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => range(Number.NaN).next(), TypeError)
    assert.throws(() => range('A').next(), TypeError)
    assert.throws(() => range([]).next(), TypeError)
    assert.throws(() => range(null).next(), TypeError)
  })

  it('can only stop at a rational number', () => {
    assert.throws(() => range(0, Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => range(0, Number.NaN).next(), TypeError)
    assert.throws(() => range(0, 'A').next(), TypeError)
    assert.throws(() => range(0, []).next(), TypeError)
    assert.throws(() => range(0, null).next(), TypeError)
  })

  it('can only increment by a rational number', () => {
    assert.throws(() => range(0, 1, Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => range(0, 1, Number.NaN).next(), TypeError)
    assert.throws(() => range(0, 1, 'A').next(), TypeError)
    assert.throws(() => range(0, 1, []).next(), TypeError)
    assert.throws(() => range(0, 1, null).next(), TypeError)
  })
})
