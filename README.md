# Robur DS

Design System agéntico de Robur.

```bash
npm install
npm run storybook
```

Storybook: https://diegosanigle.github.io/robur-ds/
Documentación: https://diegosanigle.github.io/robur-ds/docs/
Figma: https://www.figma.com/design/lTMwgNScwy7MEq8CaafRGC

Estado: tokens en dos temas, 11 componentes y 3 patrones con contrato, reglas y skills
para agentes, documentación generada, y comprobaciones de
contraste, contratos, paridad con Figma y accesibilidad en `npm test`.

## Usar el sistema desde otro proyecto

Añade el MCP a la configuración de tu agente (en Claude Code, un fichero `.mcp.json` en la raíz del proyecto):

```json
{
  "mcpServers": {
    "robur-ds": { "command": "npx", "args": ["-y", "github:diegosanigle/robur-ds"] }
  }
}
```

El agente tendrá cinco herramientas: `get_catalog`, `get_component`, `get_tokens`, `get_text_on` y `validate_code`.
