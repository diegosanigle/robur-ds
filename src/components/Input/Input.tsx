import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Texto visible que nombra el campo. Obligatorio: un campo sin etiqueta no es accesible. */
  label: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca como inválido. */
  error?: string
  /** Campo de cifra de sesión: texto grande, alineado a la derecha y teclado numérico. */
  numeric?: boolean
}

export function Input({ label, hint, error, numeric = false, id, className = '', ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-control text-primary">
        {label}
      </label>
      <input
        id={inputId}
        inputMode={numeric ? 'decimal' : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={[
          'min-h-11 w-full rounded-md border bg-surface p-3.5 text-primary shadow-sm',
          'placeholder:text-tertiary',
          'focus:border-action focus:outline-none focus:ring-3 focus:ring-focus-ring/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-danger' : 'border-control',
          numeric ? 'text-right text-h3 tabular-nums' : 'text-body',
          className,
        ].join(' ')}
        {...props}
      />
      {message ? (
        <p id={messageId} className={`text-sm ${error ? 'text-danger' : 'text-tertiary'}`}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
