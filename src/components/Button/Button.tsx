import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Jerarquía visual. Solo un `primary` por pantalla. */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Ocupa todo el ancho del contenedor. */
  fullWidth?: boolean
  /** Muestra que la acción está en curso y bloquea nuevos clics. */
  loading?: boolean
  children: ReactNode
}

const VARIANTS = {
  primary: 'bg-action text-on-action',
  secondary: 'bg-transparent text-primary border border-strong',
  danger: 'bg-transparent text-danger border border-danger',
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
        'text-title transition active:scale-98',
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
