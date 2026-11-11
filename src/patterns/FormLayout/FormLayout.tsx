import type { FormEvent, ReactNode } from 'react'
import { Button } from '../../components/Button'

export interface FormLayoutProps {
  /** Título del formulario. Dice qué se está creando o editando. */
  title: string
  /** Los campos, en el orden en que se rellenan. */
  children: ReactNode
  /** Texto del botón principal: un verbo que dice qué pasa. */
  submitLabel: string
  /** Se llama al enviar el formulario, con el botón o con la tecla Intro. */
  onSubmit: () => void
  /** Texto del botón para salir sin guardar. Si no se pasa, no hay botón. */
  cancelLabel?: string
  /** Se llama al pulsar el botón de cancelar. */
  onCancel?: () => void
  /** El envío está en curso: bloquea el botón principal. */
  submitting?: boolean
}

export function FormLayout({ title, children, submitLabel, onSubmit, cancelLabel, onCancel, submitting = false }: FormLayoutProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <h2 className="text-h2 text-primary">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
      <div className="flex flex-col gap-2">
        <Button type="submit" fullWidth loading={submitting}>
          {submitLabel}
        </Button>
        {cancelLabel ? (
          <Button variant="secondary" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
        ) : null}
      </div>
    </form>
  )
}
