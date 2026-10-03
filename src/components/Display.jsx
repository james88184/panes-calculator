export default function Display({ expression, value, isError }) {
  // Shrink font as the number gets longer so it always fits.
  const size =
    value.length > 12 ? 'text-2xl' : value.length > 9 ? 'text-3xl' : 'text-5xl'

  return (
    <div
      className="bg-slate-900 rounded-2xl px-5 py-4 mb-4 text-right overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Calculator display"
    >
      <div className="h-6 text-sm text-slate-400 truncate" data-testid="expression">
        {expression}
      </div>
      <div
        className={`font-light tabular-nums truncate ${size} ${
          isError ? 'text-red-400' : 'text-white'
        }`}
        data-testid="result"
      >
        {value}
      </div>
    </div>
  )
}
