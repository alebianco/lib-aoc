import assert from 'node:assert'
import { describe, it } from 'node:test'
import { cycle } from './cycle.js'
import { take } from './take.js'

describe('cycle', () => {
  it('accepts only iterables', () => {
    assert.throws(() => cycle({}).next(), TypeError)
    assert.throws(() => cycle(10).next(), TypeError)
    assert.doesNotThrow(() => cycle('abc').next(), TypeError)
    assert.doesNotThrow(() => cycle([1, 2, 3]).next(), TypeError)
  })

  it('can repeat iterators', () => {
    const sequenceGenerator = function * () {
      yield 1
      yield 2
    }
    const it = sequenceGenerator()

    assert.deepStrictEqual([...take(cycle(it), 5)], [1, 2, 1, 2, 1])
  })

  it('should produce an empty list from an empty source', () => {
    assert.deepStrictEqual([...take(cycle([]), 5)], [])
  })
})
