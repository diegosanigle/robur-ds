# Robur DS

Design System de Robur (app personal de entrenamiento en casa). Este repo es la
**fuente única** de tokens, componentes y documentación.

## Stack — decidido

Vite · React · TypeScript · Tailwind CSS v4 · Storybook. No proponer otro.

## Comandos

- `npm run storybook` — Storybook en local (puerto 6006)
- `npm run tokens` — genera `src/styles/tokens.css` desde `tokens/*.json`
- `npm run check` — tokens, contraste y contratos
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

## Contexto

- `docs/auditoria.md` — qué había en Robur antes de este sistema y qué se decidió.
- `docs/arquitectura.md` — capas del sistema, nomenclatura y alcance de la v1.
- `docs/accesibilidad.md` — qué se comprueba, cómo, y qué no cubren los tests.
