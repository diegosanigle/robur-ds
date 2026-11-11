import type { ReactNode } from 'react'

export interface BottomNavProps {
  /** Nombre de la navegación para lectores de pantalla. */
  label?: string
  /** Las secciones, en orden. Máximo cinco. */
  items: { value: string; label: string; href: string; icon: ReactNode }[]
  /** Valor de la sección en la que está la persona. */
  value: string
}

export function BottomNav({ label = 'Principal', items, value }: BottomNavProps) {
  return (
    <nav aria-label={label} className="flex justify-between bg-surface px-4 py-2 shadow-sm">
      {items.map((item) => {
        const current = item.value === value
        return (
          <a
            key={item.value}
            href={item.href}
            aria-current={current ? 'page' : undefined}
            className={[
              'flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-md px-3 py-1.5',
              'text-label transition active:scale-95',
              current ? 'bg-page text-primary' : 'text-tertiary',
            ].join(' ')}
          >
            <span aria-hidden="true" className="size-6">
              {item.icon}
            </span>
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
