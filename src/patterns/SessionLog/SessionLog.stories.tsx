import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { SessionLog } from './SessionLog'

const PLAN: Record<string, { id: string; name: string; target: string }[]> = {
  Empuje: [
    { id: 'press', name: 'Press de hombro', target: '3 series × 12 reps' },
    { id: 'flexiones', name: 'Flexiones', target: '3 series × 15 reps' },
  ],
  Tirón: [{ id: 'remo', name: 'Remo con banda', target: '3 series × 12 reps' }],
  Pierna: [{ id: 'sentadilla', name: 'Sentadilla', target: '4 series × 10 reps' }],
}

const meta = {
  title: 'Patrones/SessionLog',
  component: SessionLog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    dayTypes: Object.keys(PLAN),
    dayType: 'Empuje',
    exercises: PLAN.Empuje.map((exercise) => ({ ...exercise, completed: false })),
    onDayTypeChange: fn(),
    onExerciseChange: fn(),
    onSave: fn(),
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof SessionLog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Guardando: Story = { args: { saving: true } }

/** Comprueba la regla de los tres toques: tipo de día, ejercicio hecho y guardar. */
export const TresToques: Story = {
  render: function Render(args) {
    const [dayType, setDayType] = useState('Empuje')
    const [done, setDone] = useState<string[]>([])
    return (
      <SessionLog
        {...args}
        dayType={dayType}
        onDayTypeChange={setDayType}
        exercises={PLAN[dayType].map((exercise) => ({ ...exercise, completed: done.includes(exercise.id) }))}
        onExerciseChange={(id, completed) => setDone(completed ? [...done, id] : done.filter((d) => d !== id))}
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(within(canvas.getByRole('group', { name: 'Tipo de día' })).getByRole('button', { name: 'Pierna' }))
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Sentadilla' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar sesión' }))
    await expect(canvas.getByRole('checkbox', { name: 'Sentadilla' })).toBeChecked()
    await expect(args.onSave).toHaveBeenCalledOnce()
  },
}
