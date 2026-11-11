import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Nombre del ejercicio', placeholder: 'Press de hombro' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ConAyuda: Story = { args: { hint: 'Tal y como aparecerá en tu biblioteca.' } }

export const ConError: Story = { args: { error: 'Escribe un nombre para el ejercicio.' } }

export const Numerico: Story = { args: { label: 'Peso (kg)', numeric: true, placeholder: '0' } }

export const Disabled: Story = { args: { disabled: true } }

/** Comprueba que la etiqueta está asociada al campo y que se puede escribir en él. */
export const Interaccion: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Nombre del ejercicio')
    await userEvent.type(input, 'Sentadilla')
    await expect(input).toHaveValue('Sentadilla')
  },
}
