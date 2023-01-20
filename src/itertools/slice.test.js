import assert from 'node:assert'
import { describe, it } from 'node:test'
import { slice } from './slice.js'
import { count } from './count.js'

function executeCases (cases) {
  cases.forEach(([args, expected, options = {}]) => {
    it(`slice(${args.map(x => JSON.stringify(x)).join(', ')}) -> "${expected}"`, options, () => {
      assert.deepStrictEqual([...slice.apply(null, args)], expected.split(''))
    })
  })
}

describe('slice', () => {
  it('accepts only iterables', () => {
    assert.throws(() => slice({}).next(), TypeError)
    assert.throws(() => slice(10).next(), TypeError)
    assert.doesNotThrow(() => slice('abc').next())
    assert.doesNotThrow(() => slice([1, 2, 3]).next())
  })

  it('accepts a integer number or undefined as start position', () => {
    assert.throws(() => slice('abc', 1.5).next(), TypeError)
    assert.throws(() => slice('abc', Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', undefined).next())
    assert.doesNotThrow(() => slice('abc', 1).next())
    assert.doesNotThrow(() => slice('abc', 0).next())
    assert.doesNotThrow(() => slice('abc', -1).next())
  })

  it('accepts a integer number or undefined as stop position', () => {
    assert.throws(() => slice('abc', 0, 1.5).next(), TypeError)
    assert.throws(() => slice('abc', 0, Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', 0, undefined).next())
    assert.doesNotThrow(() => slice('abc', 0, 1).next())
    assert.doesNotThrow(() => slice('abc', 0, 0).next())
    assert.doesNotThrow(() => slice('abc', 0, -1).next())
  })

  it('accepts a integer number except 0 as step', () => {
    assert.throws(() => slice('abc', 0, 1, 0).next(), TypeError)
    assert.throws(() => slice('abc', 0, 1, 1.5).next(), TypeError)
    assert.throws(() => slice('abc', 0, 1, Number.NaN).next(), TypeError)
    assert.doesNotThrow(() => slice('abc', 0, 1, 1).next())
    assert.doesNotThrow(() => slice('abc', 0, 1, -1).next())
  })

  describe('going forward', function () {
    describe('should remove the requested amount of values', () => {
      executeCases([
        [['abcdefgh', 0], 'abcdefgh'],
        [['abcdefgh', 2], 'cdefgh'],
        [['abcdefgh', 10], ''],
        [['abcdefgh', -2], 'gh'],
        [['abcdefgh', -10], 'abcdefgh']
      ])
    })

    describe('should keep values up to the requested amount', () => {
      executeCases([
        [['abcdefgh', undefined, 0], ''],
        [['abcdefgh', undefined, 2], 'ab'],
        [['abcdefgh', undefined, 10], 'abcdefgh'],
        [['abcdefgh', undefined, -2], 'abcdef'],
        [['abcdefgh', undefined, -10], ''],
        [['abcdefgh', 0, 0], ''],
        [['abcdefgh', 0, 2], 'ab'],
        [['abcdefgh', 0, 10], 'abcdefgh'],
        [['abcdefgh', 0, -2], 'abcdef'],
        [['abcdefgh', 0, -10], ''],
        [['abcdefgh', 2, 0], ''],
        [['abcdefgh', 2, 2], ''],
        [['abcdefgh', 2, 10], 'cdefgh'],
        [['abcdefgh', 2, -2], 'cdef'],
        [['abcdefgh', 2, -10], ''],
        [['abcdefgh', 10, 0], ''],
        [['abcdefgh', 10, 2], ''],
        [['abcdefgh', 10, 10], ''],
        [['abcdefgh', 10, -2], ''],
        [['abcdefgh', 10, -10], ''],
        [['abcdefgh', -2, 0], ''],
        [['abcdefgh', -2, 2], ''],
        [['abcdefgh', -2, 10], 'gh'],
        [['abcdefgh', -2, -2], ''],
        [['abcdefgh', -2, -10], ''],
        [['abcdefgh', -10, 0], ''],
        [['abcdefgh', -10, 2], 'ab'],
        [['abcdefgh', -10, 10], 'abcdefgh'],
        [['abcdefgh', -10, -2], 'abcdef'],
        [['abcdefgh', -10, -10], '']
      ])
    })
  })

  describe('going backward', function () {
    describe('should remove the requested amount of values', () => {
      executeCases([
        [['abcdefgh', 0, undefined, -1], 'a'],
        [['abcdefgh', 2, undefined, -1], 'cba'],
        [['abcdefgh', 10, undefined, -1], 'hgfedcba'],
        [['abcdefgh', -2, undefined, -1], 'gfedcba'],
        [['abcdefgh', -10, undefined, -1], '']
      ])
    })

    describe('should keep values up to the requested amount', () => {
      executeCases([
        [['abcdefgh', undefined, 0, -1], 'hgfedcb'],
        [['abcdefgh', undefined, 2, -1], 'hgfed'],
        [['abcdefgh', undefined, 10, -1], ''],
        [['abcdefgh', undefined, -2, -1], 'h'],
        [['abcdefgh', undefined, -10, -1], 'hgfedcba'],
        [['abcdefgh', 0, 0, -1], ''],
        [['abcdefgh', 0, 2, -1], ''],
        [['abcdefgh', 0, 10, -1], ''],
        [['abcdefgh', 0, -2, -1], ''],
        [['abcdefgh', 0, -10, -1], 'a'],
        [['abcdefgh', 2, 0, -1], 'cb'],
        [['abcdefgh', 2, 2, -1], ''],
        [['abcdefgh', 2, 10, -1], ''],
        [['abcdefgh', 2, -2, -1], ''],
        [['abcdefgh', 2, -10, -1], 'cba'],
        [['abcdefgh', 10, 0, -1], 'hgfedcb'],
        [['abcdefgh', 10, 2, -1], 'hgfed'],
        [['abcdefgh', 10, 10, -1], ''],
        [['abcdefgh', 10, -2, -1], 'h'],
        [['abcdefgh', 10, -10, -1], 'hgfedcba'],
        [['abcdefgh', -2, 0, -1], 'gfedcb'],
        [['abcdefgh', -2, 2, -1], 'gfed'],
        [['abcdefgh', -2, 10, -1], ''],
        [['abcdefgh', -2, -2, -1], ''],
        [['abcdefgh', -2, -10, -1], 'gfedcba'],
        [['abcdefgh', -10, 0, -1], ''],
        [['abcdefgh', -10, 2, -1], ''],
        [['abcdefgh', -10, 10, -1], ''],
        [['abcdefgh', -10, -2, -1], ''],
        [['abcdefgh', -10, -10, -1], '']
      ])
    })
  })

  describe('can skip values', function () {
    executeCases([
      [['abcdefgh', 1, 6, 3], 'be'],
      [['abcdefgh', 6, 1, -3], 'gd'],
      [['abcdefgh', 1, -2, 3], 'be'],
      [['abcdefgh', 6, -6, -3], 'gd']
    ])
  })

  it('can (carefully) slice backward an infinite sequence', function () {
    assert.deepStrictEqual([...slice(count(), 110, 99, -2)], [110, 108, 106, 104, 102, 100])
  })
})
