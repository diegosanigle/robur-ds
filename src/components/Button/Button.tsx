import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Jerarquía visual. Solo un `primary` por pantalla. */
  variant?: ButtonVariant
  /** Ocupa todo el ancho del contenedor. */
  fullWidth?: boolean
  /** Muestra que la acción está en curso y bloquea nuevos clics. */
  loading?: boolean
  children: ReactNode
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-transparent text-ink border border-ink',
  danger: 'bg-transparent text-error-text border border-error-text',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-3.5',
        'text-base font-semibold transition active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        fullWidth ? 'w-full' : '',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? 'Guardando…' : children}
    </button>
  )
}
