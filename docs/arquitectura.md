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
| Token | `categoría.rol.modificador` | `color.text.secondary` |
| Story | PascalCase; en español si describe un caso | `Primary`, `ConError` |

## Estructura de carpetas

```
tokens/                  primitivos, semánticos (claro y oscuro), tipografía y parejas de contraste
scripts/                 generador de tokens y comprobaciones
src/
  components/<Nombre>/   <Nombre>.tsx · <Nombre>.stories.tsx · <Nombre>.contract.json · index.ts
  foundations/           stories que pintan los tokens
  styles/tokens.css      GENERADO desde tokens/
  styles/index.css       estilos base
  index.ts               todo lo que el sistema exporta
docs/                    auditoría, arquitectura y accesibilidad
.storybook/              configuración de Storybook
.github/workflows/       publicación automática
```

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Storybook · Vitest.
Se usa TypeScript porque los tipos de las props son la base de la documentación
automática y de la paridad con Figma.

## Tokens y clases

Cada token semántico genera las clases de Tailwind con las que se usa:

| Token | Clase |
|---|---|
| `color.text.primary` | `text-primary` |
| `color.bg.surface` | `bg-surface` |
| `color.border.control` | `border-control` |
| `color.heat.2`, `color.data.1`, `color.focus.ring` | `bg-heat-2`, `text-data-1`, `ring-focus-ring` |
| `radius.md`, `shadow.sm` | `rounded-md`, `shadow-sm` |
| `text.h1` | `text-h1` (tamaño, peso, interlineado y tracking a la vez) |

Los primitivos (`color.orange.500`) no generan clases: un componente no puede usarlos.
