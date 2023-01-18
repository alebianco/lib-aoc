import { describe, it } from 'node:test'
import assert from 'node:assert'
import { fork, makeForkable } from './fork.js'

describe('makeForkable', () => {
  it('accepts only iterables', () => {
    assert.throws(() => makeForkable({}), TypeError)
    assert.throws(() => makeForkable(10), TypeError)
    assert.doesNotThrow(() => makeForkable('abc'))
    assert.doesNotThrow(() => makeForkable([1, 2, 3]))
  })
})

describe('fork', () => {
  it('accepts only forkable iterator', () => {
    assert.throws(() => fork({}), TypeError)
    assert.throws(() => fork(10), TypeError)
    assert.throws(() => fork('abc'), TypeError)
    assert.throws(() => fork([1, 2, 3]), TypeError)
    assert.doesNotThrow(() => fork(makeForkable([1, 2, 3])))
  })

  it('should get a forkable iterator from a forked iterable', () => {
    const forkable = makeForkable([1, 2, 3, 4, 5])
    const it = forkable[Symbol.iterator]()
    assert.doesNotThrow(() => fork(it))
  })

  it('throws if a value is passed when calling next', () => {
    const it = fork(makeForkable([1, 2, 3]))
    assert.throws(() => it.next(1), TypeError)
  })

  it('should continue from the same point where where it was forked from', () => {
    const list = [1, 2, 3, 4, 5]
    const it = makeForkable(list)

    it.next() // consumes first item

    const first = fork(it)
    assert.strictEqual(first.next().value, 2)
    assert.strictEqual(first.next().value, 3)

    const second = fork(it)
    assert.strictEqual(second.next().value, 2)

    const third = fork(first)
    assert.strictEqual(third.next().value, 4)
  })
})
