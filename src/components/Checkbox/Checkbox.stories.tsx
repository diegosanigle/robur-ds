import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Flexiones' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const ConDetalle: Story = { args: { hint: '3 series × 12 reps' } }

export const Disabled: Story = { args: { disabled: true } }

/** Comprueba que se puede marcar pulsando la etiqueta, no solo la casilla. */
export const Interaccion: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Flexiones'))
    await expect(canvas.getByRole('checkbox', { name: 'Flexiones' })).toBeChecked()
  },
}
