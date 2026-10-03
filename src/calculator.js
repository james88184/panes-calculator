// Pure calculator logic (no React) so it can be tested on its own.

export const MAX_DIGITS = 12

export const initialState = {
  current: '0',        // number being typed / shown
  previous: null,      // left operand (string)
  operator: null,      // '+', '-', '×', '÷'
  overwrite: false,    // next digit replaces the display
  error: null,         // error message, e.g. "Cannot divide by zero"
  expression: '',      // small line above the result
}

export function compute(a, b, op) {
  const x = parseFloat(a)
  const y = parseFloat(b)
  switch (op) {
    case '+': return x + y
    case '-': return x - y
    case '×': return x * y
    case '÷':
      if (y === 0) throw new Error('Cannot divide by zero')
      return x / y
    default: return y
  }
}

// Avoid floating point noise like 0.1 + 0.2 = 0.30000000000000004
export function formatResult(n) {
  if (!Number.isFinite(n)) throw new Error('Invalid result')
  const rounded = parseFloat(n.toPrecision(12))
  return String(rounded)
}

export function reducer(state, action) {
  // Any key (except clear) after an error starts fresh.
  if (state.error && action.type !== 'clear') {
    state = initialState
  }

  switch (action.type) {
    case 'digit': {
      if (state.overwrite) {
        return { ...state, current: action.value, overwrite: false }
      }
      if (state.current === '0') return { ...state, current: action.value }
      if (state.current.replace(/[-.]/g, '').length >= MAX_DIGITS) return state
      return { ...state, current: state.current + action.value }
    }

    case 'decimal': {
      if (state.overwrite) return { ...state, current: '0.', overwrite: false }
      if (state.current.includes('.')) return state
      return { ...state, current: state.current + '.' }
    }

    case 'operator': {
      // Changing operator before typing a second number
      if (state.previous !== null && state.overwrite) {
        return {
          ...state,
          operator: action.value,
          expression: `${state.previous} ${action.value}`,
        }
      }
      // Chain: 2 + 3 + ... evaluates 2 + 3 first
      if (state.previous !== null && state.operator) {
        try {
          const result = formatResult(compute(state.previous, state.current, state.operator))
          return {
            ...state,
            previous: result,
            current: result,
            operator: action.value,
            overwrite: true,
            expression: `${result} ${action.value}`,
          }
        } catch (e) {
          return { ...initialState, current: 'Error', error: e.message }
        }
      }
      return {
        ...state,
        previous: state.current,
        operator: action.value,
        overwrite: true,
        expression: `${state.current} ${action.value}`,
      }
    }

    case 'equals': {
      if (state.previous === null || !state.operator) return state
      try {
        const result = formatResult(compute(state.previous, state.current, state.operator))
        return {
          ...initialState,
          current: result,
          overwrite: true,
          expression: `${state.previous} ${state.operator} ${state.current} =`,
        }
      } catch (e) {
        return { ...initialState, current: 'Error', error: e.message }
      }
    }

    case 'backspace': {
      if (state.overwrite) return state
      const next = state.current.slice(0, -1)
      return { ...state, current: next === '' || next === '-' ? '0' : next }
    }

    case 'sign': {
      if (state.current === '0') return state
      return {
        ...state,
        current: state.current.startsWith('-') ? state.current.slice(1) : '-' + state.current,
      }
    }

    case 'percent': {
      const result = formatResult(parseFloat(state.current) / 100)
      return { ...state, current: result, overwrite: true }
    }

    case 'clear':
      return initialState

    default:
      return state
  }
}
