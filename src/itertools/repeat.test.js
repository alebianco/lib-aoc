import assert from 'node:assert'
import { describe, it } from 'node:test'
import { repeat } from './repeat.js'
import { take } from './take.js'

describe('repeat', () => {
  it('can repeat a whole number of times', () => {
    assert.throws(() => [...repeat(0, -1)], TypeError)
    assert.throws(() => [...repeat(0, 1.5)], TypeError)
    assert.throws(() => [...repeat(0, Number.NaN)], TypeError)
    assert.throws(() => [...repeat(0, true)], TypeError)
    assert.throws(() => [...repeat(0, '1')], TypeError)
    assert.doesNotThrow(() => [...repeat(0, 0)])
    assert.doesNotThrow(() => [...repeat(0, 1)])
  })

  it('can repeat anything', () => {
    assert.deepStrictEqual([...repeat(0, 2)], [0, 0])
    assert.deepStrictEqual([...repeat({ a: 1 }, 2)], [{ a: 1 }, { a: 1 }])
    assert.deepStrictEqual(
      [...repeat([1, 2], 2)],
      [
        [1, 2],
        [1, 2]
      ]
    )
  })

  it('will repeat the provided object', () => {
    const target = { a: 1 }
    const result = [...repeat(target, 2)]

    assert.strictEqual(result[0], target)
    assert.strictEqual(result[1], target)
  })

  it('can repeat indefinitely', () => {
    assert.deepStrictEqual([...take(repeat(0), 100)].length, 100)
  })
})
