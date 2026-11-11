import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

export interface SheetProps {
  /** La hoja está abierta. */
  open: boolean
  /** Se llama cuando la persona cierra la hoja: botón, tecla Escape o toque fuera. */
  onClose: () => void
  /** Título visible. Obligatorio: es el nombre de la hoja para lectores de pantalla. */
  title: string
  children: ReactNode
}

export function Sheet({ open, onClose, title, children }: SheetProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  // <dialog> con showModal() ya atrapa el foco, cierra con Escape y devuelve el foco al cerrar.
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) element.showModal()
    if (!open && element.open) element.close()
  }, [open])

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose()
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto w-full max-w-120 rounded-t-xl bg-surface text-primary shadow-md backdrop:bg-overlay"
    >
      <div className="p-5 pb-8">
        <div aria-hidden="true" className="mx-auto mb-2 w-9 rounded-pill border-t-4 border-default" />
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-pill text-tertiary transition active:scale-95"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
