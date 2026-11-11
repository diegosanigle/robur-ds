import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Chip } from './Chip'

const meta = {
  title: 'Componentes/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: 'Empuje' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = { args: { selected: true } }

export const Accent: Story = { args: { variant: 'accent', children: 'Nuevo' } }

export const Disabled: Story = { args: { disabled: true } }

/** Un grupo de chips para elegir el tipo de día. Comprueba que al pulsar cambia la selección. */
export const Interaccion: Story = {
  render: function Render() {
    const [day, setDay] = useState('Empuje')
    return (
      <div className="flex gap-2">
        {['Empuje', 'Tirón', 'Pierna'].map((d) => (
          <Chip key={d} selected={day === d} onClick={() => setDay(d)}>
            {d}
          </Chip>
        ))}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Pierna' }))
    await expect(canvas.getByRole('button', { name: 'Pierna' })).toHaveAttribute('aria-pressed', 'true')
    await expect(canvas.getByRole('button', { name: 'Empuje' })).toHaveAttribute('aria-pressed', 'false')
  },
}
