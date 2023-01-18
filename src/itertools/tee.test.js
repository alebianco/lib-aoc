import assert from 'node:assert'
import { describe, it } from 'node:test'
import { tee } from './tee.js'

describe('take', () => {
  it('accepts only iterables', () => {
    assert.throws(() => tee({}, 2), TypeError)
    assert.throws(() => tee(10, 2), TypeError)
    assert.doesNotThrow(() => tee('abc', 2), TypeError)
    assert.doesNotThrow(() => tee([1, 2, 3], 2), TypeError)
  })

  it('can make a whole number of copies', () => {
    assert.throws(() => tee([1, 2, 3], Number.POSITIVE_INFINITY).length, TypeError)
    assert.throws(() => tee([1, 2, 3], 1.5).length, TypeError)
    assert.throws(() => tee([1, 2, 3], -1).length, TypeError)
    assert.deepStrictEqual(tee([1, 2, 3], 0).length, 0)
    assert.deepStrictEqual(tee([1, 2, 3], 3).length, 3)
  })

  it('returns the same values from all copies', () => {
    const list = tee([{}, {}, {}], 3)

    const [a, b, c] = list.map(it => it.next())

    assert.strictEqual(a.value, b.value)
    assert.strictEqual(a.value, c.value)

    list.map(it => it.next())
    list.map(it => it.next())

    assert.deepStrictEqual(list.map(it => it.next().done), [true, true, true])
  })
})
