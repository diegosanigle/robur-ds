import type { Meta, StoryObj } from '@storybook/react-vite'
import { cssVar, primitiveTokens, primitiveVar, semanticTokens, textStyles } from './tokens'

const meta = {
  title: 'Fundamentos/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Swatch = ({ color }: { color: string }) => (
  <span className="inline-block size-10 shrink-0 rounded-sm border border-default" style={{ background: color }} />
)

const GROUPS = { text: 'Texto', bg: 'Fondos', border: 'Bordes', focus: 'Foco', heat: 'Heatmap', data: 'Datos' }

/** Los tokens que usan los componentes. Cambia el tema en la barra superior para ver sus valores en oscuro. */
export const ColoresSemanticos: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {Object.entries(GROUPS).map(([group, title]) => (
        <section key={group}>
          <h2 className="mb-3 text-h3">{title}</h2>
          <ul className="flex flex-col gap-2">
            {semanticTokens
              .filter((token) => token.name.startsWith(`color.${group}.`))
              .map((token) => (
                <li key={token.name} className="flex items-center gap-3">
                  <Swatch color={cssVar(token.name)} />
                  <div>
                    <p className="text-sm font-semibold">{token.name}</p>
                    <p className="text-sm text-tertiary">
                      {token.description ? `${token.description} ` : ''}Claro: {token.light} · Oscuro: {token.dark}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  ),
}

/** La paleta en bruto. Los componentes no la usan: solo sirve para dar valor a los semánticos. */
export const ColoresPrimitivos: Story = {
  render: () => (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {primitiveTokens
        .filter((token) => token.name.startsWith('color.'))
        .map((token) => (
          <li key={token.name} className="flex items-center gap-3">
            <Swatch color={primitiveVar(token.name)} />
            <div>
              <p className="text-sm font-semibold">{token.name.replace('color.', '')}</p>
              <p className="text-sm text-tertiary">{String(token.value)}</p>
            </div>
          </li>
        ))}
    </ul>
  ),
}

export const Tipografia: Story = {
  render: () => (
    <ul className="flex flex-col gap-6">
      {textStyles.map((token) => {
        const name = token.name.replace('text.', '')
        const value = token.value as { fontSize: string; fontWeight: number; lineHeight: number }
        return (
          <li key={token.name}>
            <p
              style={{
                fontSize: `var(--text-${name})`,
                fontWeight: `var(--text-${name}--font-weight)`,
                lineHeight: `var(--text-${name}--line-height)`,
                letterSpacing: `var(--text-${name}--letter-spacing)`,
              }}
            >
              Tres sesiones esta semana
            </p>
            <p className="text-sm text-tertiary">
              text-{name} · {value.fontSize} · peso {value.fontWeight} · interlineado {value.lineHeight}
            </p>
          </li>
        )
      })}
    </ul>
  ),
}

export const RadiosYSombras: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-6">
      {primitiveTokens
        .filter((token) => /^(radius|shadow)\./.test(token.name))
        .map((token) => {
          const name = token.name.replace('.', '-')
          const isRadius = token.name.startsWith('radius.')
          return (
            <li key={token.name} className="flex flex-col items-center gap-2">
              <span
                className="block size-20 border border-control bg-surface"
                style={isRadius ? { borderRadius: `var(--${name})` } : { boxShadow: `var(--${name})`, borderRadius: 'var(--radius-md)' }}
              />
              <p className="text-sm font-semibold">{isRadius ? name.replace('radius', 'rounded') : name}</p>
              <p className="text-sm text-tertiary">{isRadius ? String(token.value) : ''}</p>
            </li>
          )
        })}
    </ul>
  ),
}
