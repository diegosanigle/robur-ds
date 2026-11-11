import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'

export interface ExerciseRowProps {
  /** Nombre del ejercicio. */
  name: string
  /** Objetivo del ejercicio, ya formateado: «3 series × 12 reps». */
  target?: string
  /** El ejercicio está hecho. */
  completed: boolean
  /** Se llama con el nuevo estado al marcar o desmarcar. */
  onCompletedChange: (completed: boolean) => void
  /** Los campos de registro: series, repeticiones, peso. Máximo tres. */
  children?: ReactNode
}

export function ExerciseRow({ name, target, completed, onCompletedChange, children }: ExerciseRowProps) {
  return (
    <div className={`flex flex-col gap-3 rounded-md border border-default p-3.5 ${completed ? 'bg-action-soft' : 'bg-surface'}`}>
      <Checkbox label={name} hint={target} checked={completed} onChange={(event) => onCompletedChange(event.target.checked)} />
      {children ? <div className="grid grid-cols-3 gap-2">{children}</div> : null}
    </div>
  )
}
