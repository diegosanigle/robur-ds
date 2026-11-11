import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Componentes/StatCard',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Sesiones este mes', value: '14' },
  decorators: [(Story) => <div className="w-56"><Story /></div>],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Surface: Story = {}

export const ConUnidad: Story = { args: { label: 'Volumen semanal', value: '2.480', unit: 'kg' } }

export const Inverse: Story = { args: { variant: 'inverse' } }

export const InverseSecondary: Story = {
  args: { variant: 'inverse', series: 'secondary', label: 'Peso máximo', value: '62,5', unit: 'kg' },
}
