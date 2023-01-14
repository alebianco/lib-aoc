import assert from 'node:assert'
import { describe, it } from 'node:test'
import { count } from './count.js'

describe('count', () => {
  it('should start at 0 by default', () => {
    assert.strictEqual(count().next().value, 0)
  })

  it('should start at the requested value', () => {
    const start = 10
    assert.strictEqual(count(start).next().value, start)
  })

  it('can start from negative numbers', () => {
    const start = -10
    assert.strictEqual(count(start).next().value, start)
  })

  it('can start from a fraction', () => {
    const start = 1.5
    assert.strictEqual(count(start).next().value, start)
  })

  it('can only start from a rational number', () => {
    assert.throws(() => count(Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => count(Number.NaN).next(), TypeError)
    assert.throws(() => count('A').next(), TypeError)
    assert.throws(() => count([]).next(), TypeError)
    assert.throws(() => count(null).next(), TypeError)
  })

  it('should increment by 1 by default', () => {
    const it = count()
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, 1)
  })

  it('can increment by the requested amount', () => {
    const it = count(0, 10)
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, 10)
    assert.strictEqual(it.next().value, 20)
  })

  it('can increment by the negative amount', () => {
    const it = count(0, -10)
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, -10)
    assert.strictEqual(it.next().value, -20)
  })

  it('can increment by the fractional amount', () => {
    const it = count(0, 1.5)
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, 1.5)
    assert.strictEqual(it.next().value, 3)
  })

  it('can only increment by a rational number', () => {
    assert.throws(() => count(0, Number.POSITIVE_INFINITY).next(), TypeError)
    assert.throws(() => count(0, Number.NaN).next(), TypeError)
    assert.throws(() => count(0, 'A').next(), TypeError)
    assert.throws(() => count(0, []).next(), TypeError)
    assert.throws(() => count(0, null).next(), TypeError)
  })
})
