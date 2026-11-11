# Robur DS

Design System de Robur (app personal de entrenamiento en casa). Este repo es la
**fuente única** de tokens, componentes y documentación.

## Stack — decidido

Vite · React · TypeScript · Tailwind CSS v4 · Storybook. No proponer otro.

## Comandos

- `npm run storybook` — Storybook en local (puerto 6006)
- `npm run build-storybook` — genera el Storybook estático
- `npm test` — tests de las stories (interacción y accesibilidad)
- `npm run build` — comprueba tipos y compila

## Reglas

- Cada componente vive en `src/components/<Nombre>/` con tres ficheros:
  `<Nombre>.tsx`, `<Nombre>.stories.tsx` e `index.ts`.
- Todo componente nuevo se exporta desde `src/index.ts`.
- Colores, radios, sombras y tipografías salen de `src/styles/index.css`.
  **Nunca** un valor hex ni un valor arbitrario de Tailwind (`[...]`) en un componente.
- Cada variante y cada estado tienen su story. Lo que no tiene story no existe.
- Texto de la interfaz en español. Código y nombres de props en inglés.
- Antes de dar un cambio por terminado: `npm test` y `npm run build` en verde.

## Contexto

- `docs/auditoria.md` — qué había en Robur antes de este sistema y qué se decidió.
- `docs/arquitectura.md` — capas del sistema, nomenclatura y alcance de la v1.
