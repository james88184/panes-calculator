import Button from './Button.jsx'

export default function Keypad({ dispatch, flash }) {
  const digit = (d) => ({
    label: d,
    onClick: () => dispatch({ type: 'digit', value: d }),
    pressed: flash === d,
  })
  const op = (symbol, key) => ({
    label: symbol,
    variant: 'operator',
    onClick: () => dispatch({ type: 'operator', value: symbol }),
    pressed: flash === key,
  })

  return (
    <div className="grid grid-cols-4 gap-3">
      <Button label="C" ariaLabel="Clear" variant="clear" onClick={() => dispatch({ type: 'clear' })} pressed={flash === 'C'} />
      <Button label="±" ariaLabel="Toggle sign" variant="function" onClick={() => dispatch({ type: 'sign' })} />
      <Button label="%" ariaLabel="Percent" variant="function" onClick={() => dispatch({ type: 'percent' })} />
      <Button {...op('÷', '/')} ariaLabel="Divide" />

      <Button {...digit('7')} />
      <Button {...digit('8')} />
      <Button {...digit('9')} />
      <Button {...op('×', '*')} ariaLabel="Multiply" />

      <Button {...digit('4')} />
      <Button {...digit('5')} />
      <Button {...digit('6')} />
      <Button {...op('-', '-')} ariaLabel="Subtract" />

      <Button {...digit('1')} />
      <Button {...digit('2')} />
      <Button {...digit('3')} />
      <Button {...op('+', '+')} ariaLabel="Add" />

      <Button {...digit('0')} span={2} />
      <Button label="." ariaLabel="Decimal point" onClick={() => dispatch({ type: 'decimal' })} pressed={flash === '.'} />
      <Button label="=" ariaLabel="Equals" variant="equals" onClick={() => dispatch({ type: 'equals' })} pressed={flash === '='} />
    </div>
  )
}
