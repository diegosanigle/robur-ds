import { useId, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'

export interface TabsProps {
  /** Nombre del grupo de pestañas para lectores de pantalla. */
  label: string
  /** Las pestañas, en orden. Entre dos y cuatro. */
  tabs: { value: string; label: string }[]
  /** Valor de la pestaña activa. */
  value: string
  /** Se llama con el valor de la pestaña elegida. */
  onChange: (value: string) => void
  /** Contenido de la pestaña activa. */
  children?: ReactNode
}

export function Tabs({ label, tabs, value, onChange, children }: TabsProps) {
  const id = useId()
  const list = useRef<HTMLDivElement>(null)

  // Patrón de pestañas de WAI-ARIA: las flechas mueven el foco y la selección a la vez.
  function onKeyDown(event: KeyboardEvent) {
    const index = tabs.findIndex((tab) => tab.value === value)
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    onChange(tabs[next].value)
    list.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <div className="flex flex-col gap-4">
      <div ref={list} role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex gap-1 rounded-pill bg-surface p-1">
        {tabs.map((tab) => {
          const active = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.value}`}
              aria-selected={active}
              aria-controls={active && children ? `${id}-panel` : undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(tab.value)}
              className={[
                'min-h-11 flex-1 rounded-pill px-4 text-sm font-semibold transition active:scale-95',
                active ? 'bg-selected text-on-selected' : 'text-tertiary',
              ].join(' ')}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {children ? (
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${value}`} tabIndex={0}>
          {children}
        </div>
      ) : null}
    </div>
  )
}
