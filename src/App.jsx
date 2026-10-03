import { useEffect, useReducer, useState } from 'react'
import { reducer, initialState } from './calculator.js'
import Display from './components/Display.jsx'
import Keypad from './components/Keypad.jsx'
import Instructions from './components/Instructions.jsx'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [flash, setFlash] = useState(null) // key that was just pressed on the keyboard

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key
      let flashKey = k

      if (/^\d$/.test(k)) dispatch({ type: 'digit', value: k })
      else if (k === '.') dispatch({ type: 'decimal' })
      else if (k === '+') dispatch({ type: 'operator', value: '+' })
      else if (k === '-') dispatch({ type: 'operator', value: '-' })
      else if (k === '*' || k === 'x' || k === 'X') { dispatch({ type: 'operator', value: '×' }); flashKey = '*' }
      else if (k === '/') { e.preventDefault(); dispatch({ type: 'operator', value: '÷' }) }
      else if (k === 'Enter' || k === '=') { e.preventDefault(); dispatch({ type: 'equals' }); flashKey = '=' }
      else if (k === 'Backspace') dispatch({ type: 'backspace' })
      else if (k === 'Escape' || k === 'c' || k === 'C') { dispatch({ type: 'clear' }); flashKey = 'C' }
      else if (k === '%') dispatch({ type: 'percent' })
      else return

      setFlash(flashKey)
      setTimeout(() => setFlash(null), 150)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-4">Simple Calculator</h1>

        <div className="bg-slate-700 rounded-3xl shadow-2xl p-5">
          <Display
            expression={state.error || state.expression}
            value={state.current}
            isError={!!state.error}
          />
          <Keypad dispatch={dispatch} flash={flash} />
        </div>

        <Instructions />

        <p className="text-center text-xs text-slate-600 mt-4">
          DCIT 26: Application Development and Emerging Technologies · Laboratory 1
        </p>
      </div>
    </main>
  )
}
