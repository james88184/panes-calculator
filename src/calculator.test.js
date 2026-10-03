import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reducer, initialState } from './calculator.js'

// Helper: feed a sequence of keys like "2", "+", "3", "="
function run(keys) {
  let s = initialState
  for (const k of keys) {
    if (/^\d$/.test(k)) s = reducer(s, { type: 'digit', value: k })
    else if (k === '.') s = reducer(s, { type: 'decimal' })
    else if (k === '=') s = reducer(s, { type: 'equals' })
    else if (k === 'C') s = reducer(s, { type: 'clear' })
    else if (k === 'B') s = reducer(s, { type: 'backspace' })
    else s = reducer(s, { type: 'operator', value: k })
  }
  return s
}

test('addition', () => assert.equal(run(['2', '+', '3', '=']).current, '5'))
test('subtraction', () => assert.equal(run(['9', '-', '4', '=']).current, '5'))
test('multiplication', () => assert.equal(run(['6', '×', '7', '=']).current, '42'))
test('division', () => assert.equal(run(['8', '÷', '2', '=']).current, '4'))
test('decimals avoid float noise', () => assert.equal(run(['0', '.', '1', '+', '0', '.', '2', '=']).current, '0.3'))
test('chained operations', () => assert.equal(run(['2', '+', '3', '×', '4', '=']).current, '20'))
test('divide by zero gives error', () => {
  const s = run(['5', '÷', '0', '='])
  assert.equal(s.error, 'Cannot divide by zero')
  assert.equal(s.current, 'Error')
})
test('typing after error starts fresh', () => {
  const s = run(['5', '÷', '0', '=', '7'])
  assert.equal(s.current, '7')
  assert.equal(s.error, null)
})
test('clear resets everything', () => {
  const s = run(['5', '+', '3', 'C'])
  assert.deepEqual(s, initialState)
})
test('only one decimal point', () => assert.equal(run(['1', '.', '2', '.', '3']).current, '1.23'))
test('backspace', () => assert.equal(run(['1', '2', '3', 'B']).current, '12'))
test('change operator before second number', () => assert.equal(run(['5', '+', '-', '2', '=']).current, '3'))
test('new number after equals replaces result', () => assert.equal(run(['2', '+', '2', '=', '9']).current, '9'))
