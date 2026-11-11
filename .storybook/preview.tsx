import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // 'error': un fallo de accesibilidad rompe los tests.
    a11y: { test: 'error' },
    options: {
      storySort: { order: ['Fundamentos', 'Componentes', 'Patrones', 'Pantallas', 'Resumen', 'Datos'] },
    },
  },
  // Selector de tema en la barra de Storybook.
  globalTypes: {
    theme: {
      description: 'Tema del sistema',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Oscuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return <Story />
    },
  ],
}

export default preview
