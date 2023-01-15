import assert from 'node:assert'
import { describe, it } from 'node:test'
import { evens, naturals, odds } from './numbers.js'

describe('naturals', () => {
  it('should start at 0', () => {
    assert.strictEqual(naturals().next().value, 0)
  })

  it('should increment by 1', () => {
    const it = naturals()
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, 1)
    assert.strictEqual(it.next().value, 2)
  })
})

describe('evens', () => {
  it('should start at 0', () => {
    assert.strictEqual(evens().next().value, 0)
  })

  it('should increment by 2', () => {
    const it = evens()
    assert.strictEqual(it.next().value, 0)
    assert.strictEqual(it.next().value, 2)
    assert.strictEqual(it.next().value, 4)
  })
})

describe('odds', () => {
  it('should start at 1', () => {
    assert.strictEqual(odds().next().value, 1)
  })

  it('should increment by 2', () => {
    const it = odds()
    assert.strictEqual(it.next().value, 1)
    assert.strictEqual(it.next().value, 3)
    assert.strictEqual(it.next().value, 5)
  })
})
