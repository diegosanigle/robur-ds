# Arquitectura de Robur DS

## Capas

```
5. Capa agéntica   reglas · skills · MCP · evals        (Bloques 3 y 4)
4. Documentación   Storybook · web de docs              (Bloque 3)
3. Patrones        combinaciones de componentes         (Bloque 3)
2. Componentes     código React + contrato + story      (Bloques 1 y 2)
1. Tokens          primitivos → semánticos              (Bloque 2)
```

Cada capa solo usa la de debajo. Un componente no inventa un color: pide un token.
Un patrón no inventa un botón: usa el componente.

## Nomenclatura

| Qué | Regla | Ejemplo |
|---|---|---|
| Componente | PascalCase, sustantivo en inglés | `Button`, `StatCard` |
| Prop | camelCase en inglés | `fullWidth` |
| Variante | minúsculas, por función y no por aspecto | `primary`, `danger` (no `orange`) |
| Estado booleano | adjetivo sin `is` | `disabled`, `loading`, `selected` |
| Token | `categoría-rol-modificador` | `color-text-secondary` |
| Story | PascalCase; en español si describe un caso | `Primary`, `ConError` |

## Estructura de carpetas

```
src/
  components/<Nombre>/   <Nombre>.tsx · <Nombre>.stories.tsx · index.ts
  styles/index.css       tema de Tailwind
  index.ts               todo lo que el sistema exporta
docs/                    auditoría y arquitectura
.storybook/              configuración de Storybook
.github/workflows/       publicación automática
```

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Storybook · Vitest.
Se usa TypeScript porque los tipos de las props son la base de la documentación
automática y de la paridad con Figma.
