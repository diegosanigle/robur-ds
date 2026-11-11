import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Input } from '../Input'
import { ExerciseRow } from './ExerciseRow'

const fields = (
  <>
    <Input numeric label="Series" defaultValue="3" />
    <Input numeric label="Reps" defaultValue="12" />
    <Input numeric label="Peso (kg)" defaultValue="20" />
  </>
)

const meta = {
  title: 'Componentes/ExerciseRow',
  component: ExerciseRow,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { name: 'Press de hombro', target: '3 series × 12 reps', completed: false, onCompletedChange: fn(), children: fields },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof ExerciseRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Completed: Story = { args: { completed: true } }

export const SinCampos: Story = { args: { children: undefined, name: 'Plancha', target: '60 s' } }

/** Comprueba que marcar el ejercicio avisa con el nuevo estado. */
export const Interaccion: Story = {
  render: function Render(args) {
    const [completed, setCompleted] = useState(false)
    return (
      <ExerciseRow
        {...args}
        completed={completed}
        onCompletedChange={(next) => {
          setCompleted(next)
          args.onCompletedChange(next)
        }}
      />
    )
  },
  play: async ({ canvasElement, args }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Press de hombro' })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await expect(args.onCompletedChange).toHaveBeenCalledWith(true)
  },
}
