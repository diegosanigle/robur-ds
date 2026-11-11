import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { ExerciseRow } from '../../components/ExerciseRow'

export interface SessionLogProps {
  /** Los tipos de día entre los que elegir, en orden. */
  dayTypes: string[]
  /** El tipo de día elegido. */
  dayType: string
  /** Se llama con el tipo de día pulsado. */
  onDayTypeChange: (dayType: string) => void
  /** Los ejercicios del día elegido. */
  exercises: { id: string; name: string; target?: string; completed: boolean }[]
  /** Se llama al marcar o desmarcar un ejercicio. */
  onExerciseChange: (id: string, completed: boolean) => void
  /** Se llama al guardar la sesión. */
  onSave: () => void
  /** El guardado está en curso. */
  saving?: boolean
}

export function SessionLog({ dayTypes, dayType, onDayTypeChange, exercises, onExerciseChange, onSave, saving = false }: SessionLogProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h2 text-primary">Registrar sesión</h2>
      <div role="group" aria-label="Tipo de día" className="flex flex-wrap gap-2">
        {dayTypes.map((type) => (
          <Chip key={type} selected={type === dayType} onClick={() => onDayTypeChange(type)}>
            {type}
          </Chip>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <ExerciseRow
              name={exercise.name}
              target={exercise.target}
              completed={exercise.completed}
              onCompletedChange={(completed) => onExerciseChange(exercise.id, completed)}
            />
          </li>
        ))}
      </ul>
      <Button fullWidth loading={saving} onClick={onSave}>
        Guardar sesión
      </Button>
    </section>
  )
}
