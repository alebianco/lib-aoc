import assert from 'node:assert'
import { describe, it } from 'node:test'
import { chain } from './chain.js'

describe('chain', () => {
  it('can concatenate homogenous sequences', () => {
    assert.deepStrictEqual([...chain('abc', 'def')], 'abcdef'.split(''))
  })

  it('can concatenate mixed sequences', () => {
    assert.deepStrictEqual([...chain(['a', 'b', 'c'], 'def')], 'abcdef'.split(''))
  })

  it('can mix sequences and values', () => {
    assert.deepStrictEqual([...chain(1, [2, 3], 4, 5, [6])], [1, 2, 3, 4, 5, 6])
  })

  it('only spreads the first level', () => {
    assert.deepStrictEqual([...chain([[1, 2]], [[3, 4]])], [[1, 2], [3, 4]])
  })
})
