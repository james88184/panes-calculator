import { useState } from 'react'

export default function Instructions() {
  const [open, setOpen] = useState(false)

  return (
    <section className="mt-6 bg-white/80 rounded-2xl shadow p-4 text-slate-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-left font-semibold text-slate-900
          focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 rounded-lg"
      >
        <span>Instructions / User Guide</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-slate-900">How to use the calculator</h3>
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>Click the number buttons (0–9) or type on your keyboard.</li>
              <li>Choose an operator (+, −, ×, ÷).</li>
              <li>Enter the second number.</li>
              <li>Press <b>=</b> to see the result.</li>
              <li>Press <b>C</b> to clear and start over.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Supported operations</h3>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Addition (+), subtraction (−), multiplication (×), division (÷)</li>
              <li>Decimals (.), sign toggle (±), percent (%)</li>
              <li>Chained calculations, e.g. 2 + 3 × 4 = 20 (evaluated left to right)</li>
              <li>Error message when dividing by zero</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Keyboard shortcuts</h3>
            <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
              <li><kbd className="font-mono">0–9</kbd> digits</li>
              <li><kbd className="font-mono">+ - * /</kbd> operators</li>
              <li><kbd className="font-mono">Enter / =</kbd> equals</li>
              <li><kbd className="font-mono">Esc / C</kbd> clear</li>
              <li><kbd className="font-mono">Backspace</kbd> delete digit</li>
              <li><kbd className="font-mono">.</kbd> decimal</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
