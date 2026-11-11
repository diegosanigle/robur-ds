import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `default` para elegir entre opciones; `accent` para destacar una sin seleccionarla. */
  variant?: 'default' | 'accent'
  /** La opción está elegida. */
  selected?: boolean
  children: ReactNode
}

const VARIANTS = {
  default: 'border-default bg-surface text-tertiary',
  accent: 'border-transparent bg-action-soft text-action',
}

export function Chip({ variant = 'default', selected = false, type = 'button', className = '', children, ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-pill border px-4',
        'text-control transition active:scale-95',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        selected ? 'border-transparent bg-selected text-on-selected' : VARIANTS[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
