const VARIANTS = {
  number: 'bg-slate-200 hover:bg-slate-300 text-slate-900',
  function: 'bg-slate-400 hover:bg-slate-500 text-slate-900',
  operator: 'bg-amber-500 hover:bg-amber-600 text-white',
  clear: 'bg-rose-500 hover:bg-rose-600 text-white',
  equals: 'bg-emerald-500 hover:bg-emerald-600 text-white',
}

export default function Button({ label, onClick, variant = 'number', span = 1, pressed, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`h-16 rounded-xl text-2xl font-medium shadow-sm transition-colors
        focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400
        active:scale-95 ${VARIANTS[variant]} ${span === 2 ? 'col-span-2' : ''}
        ${pressed ? 'pressed' : ''}`}
    >
      {label}
    </button>
  )
}
