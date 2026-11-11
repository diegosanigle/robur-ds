import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Texto visible que nombra la casilla. Obligatorio: una casilla sin etiqueta no es accesible. */
  label: string
  /** Detalle breve bajo la etiqueta. */
  hint?: string
}

export function Checkbox({ label, hint, id, className = '', ...props }: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const labelId = `${inputId}-label`
  const hintId = `${inputId}-hint`

  return (
    <label htmlFor={inputId} className={`flex min-h-11 cursor-pointer items-center gap-3 ${className}`}>
      <span className="grid size-6 shrink-0 place-items-center">
        <input
          id={inputId}
          type="checkbox"
          aria-labelledby={labelId}
          aria-describedby={hint ? hintId : undefined}
          className={[
            'peer col-start-1 row-start-1 size-6 cursor-pointer appearance-none rounded-xs border border-control bg-surface',
            'checked:border-transparent checked:bg-action',
            'disabled:cursor-not-allowed disabled:opacity-50',
          ].join(' ')}
          {...props}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none col-start-1 row-start-1 hidden size-4 text-on-action peer-checked:block"
        >
          <path d="M3 8.5l3.5 3.5L13 5" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span id={labelId} className="text-title text-primary">
          {label}
        </span>
        {hint ? (
          <span id={hintId} className="text-sm text-secondary">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  )
}
