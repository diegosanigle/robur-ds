# Robur DS

Design System de Robur (app personal de entrenamiento en casa). Este repo es la
**fuente única** de tokens, componentes y documentación.

## Stack — decidido

Vite · React · TypeScript · Tailwind CSS v4 · Storybook. No proponer otro.

## Comandos

- `npm run storybook` — Storybook en local (puerto 6006)
- `npm run tokens` — genera `src/styles/tokens.css` desde `tokens/*.json`
- `npm run check` — tokens, contraste, contratos y paridad con Figma
- `npm run figma:tokens` — prepara los tokens para llevarlos a Figma
- `npm test` — `check` + tests de las stories (interacción y accesibilidad)
- `npm run build` — comprueba tipos y compila

## Reglas

### Tokens

- Los valores viven en `tokens/*.json`. `src/styles/tokens.css` se genera: **no se edita a mano**.
- Un token semántico apunta siempre a un primitivo. Nunca lleva un valor directo.
- Los temas claro y oscuro tienen exactamente los mismos tokens.
- Un par de colores nuevo que se use junto (texto sobre fondo) se añade a `tokens/contrast.json`.

### Componentes

- Cada componente vive en `src/components/<Nombre>/` con cuatro ficheros:
  `<Nombre>.tsx`, `<Nombre>.stories.tsx`, `<Nombre>.contract.json` e `index.ts`.
- Todo componente nuevo se exporta desde `src/index.ts`.
- Un componente solo usa clases que salen de tokens semánticos (`bg-surface`,
  `text-primary`, `rounded-md`). **Nunca** un valor hex, un primitivo ni un valor
  arbitrario de Tailwind (`[...]`).
- Si falta un token, se propone y se añade a `tokens/`; no se improvisa en el componente.
- El contrato se cambia en el mismo commit que el código. `npm run check` lo verifica.
- Cada variante y cada estado tienen su story. Lo que no tiene story no existe.
- Cada prop lleva un comentario de una línea: es su documentación.
- Texto de la interfaz en español. Código y nombres de props en inglés.
- Antes de dar un cambio por terminado: `npm test` y `npm run build` en verde.

### Figma

- La librería está en https://www.figma.com/design/lTMwgNScwy7MEq8CaafRGC
- El código manda: un cambio empieza en `tokens/` o en el contrato y después se lleva a Figma. Nunca al revés.
- Las variables de Figma se crean con `scripts/figma/sync-variables.js`; no se crean a mano.
- Cada prop del contrato tiene en Figma una propiedad con el mismo nombre y los mismos valores.
  Las excepciones se escriben en el campo `figma` del contrato, con su motivo.
- Después de tocar componentes en Figma: ejecutar `scripts/figma/snapshot.js`, guardar el
  resultado en `figma/library.json` y pasar `npm run check`.
- En Figma no hay colores a mano: todo relleno y todo borde van enlazados a una variable.
- El plan gratuito de Figma solo admite un modo: Figma tiene el tema claro. El oscuro vive en el código.

## Contexto

- `docs/auditoria.md` — qué había en Robur antes de este sistema y qué se decidió.
- `docs/arquitectura.md` — capas del sistema, nomenclatura y alcance de la v1.
- `docs/accesibilidad.md` — qué se comprueba, cómo, y qué no cubren los tests.
