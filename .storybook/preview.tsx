import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // 'todo' muestra los fallos de accesibilidad sin romper los tests.
    // En la lección 2.3 lo subimos a 'error', cuando el sistema ya los supera.
    a11y: { test: 'todo' },
  },
}

export default preview
