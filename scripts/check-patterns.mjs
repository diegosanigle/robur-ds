// Comprueba los patrones: que solo combinan componentes del sistema y que su contrato dice la verdad.
// Uso: node scripts/check-patterns.mjs
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'react-docgen'
import { root } from './lib/tokens.mjs'

const dir = join(root, 'src', 'patterns')
const REQUIRED = ['name', 'description', 'useWhen', 'avoidWhen', 'props', 'components', 'rules', 'accessibility']
// Un patrón no dibuja controles: los pone el sistema.
const RAW = ['button', 'input', 'select', 'textarea', 'a', 'dialog']
// Ni decide el aspecto de las superficies: fondos, bordes, radios y sombras son de los componentes.
const SURFACE = /(?<![\w-])(bg|border|rounded|shadow|ring|outline)-[a-z]/
const errors = []
const names = existsSync(dir) ? readdirSync(dir).sort() : []
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort())

for (const name of names) {
  const fail = (message) => errors.push(`${name}: ${message}`)
  const file = (suffix) => join(dir, name, suffix)
  for (const suffix of [`${name}.tsx`, `${name}.stories.tsx`, `${name}.pattern.json`, 'index.ts']) {
    if (!existsSync(file(suffix))) fail(`falta ${suffix}`)
  }
  if (!existsSync(file(`${name}.pattern.json`)) || !existsSync(file(`${name}.tsx`))) continue

  const contract = JSON.parse(readFileSync(file(`${name}.pattern.json`), 'utf8'))
  const code = readFileSync(file(`${name}.tsx`), 'utf8')

  for (const key of REQUIRED) if (!(key in contract)) fail(`al contrato le falta "${key}"`)
  if (contract.name !== name) fail(`el contrato se llama "${contract.name}"`)

  const imported = [...code.matchAll(/from '\.\.\/\.\.\/components\/(\w+)'/g)].map((m) => m[1])
  if (!same(imported, contract.components ?? [])) fail(`importa [${imported}] y el contrato declara components [${contract.components}]`)
  if (!imported.length) fail('no usa ningún componente del sistema')

  for (const tag of RAW) if (new RegExp(`<${tag}[\\s>]`).test(code)) fail(`dibuja un <${tag}> propio: usa el componente del sistema`)
  const surface = SURFACE.exec(code)
  if (surface) fail(`usa la clase "${surface[0]}…": fondos, bordes, radios y sombras los ponen los componentes`)

  const doc = parse(code, { filename: `${name}.tsx` }).find((d) => d.displayName === name)
  const inCode = Object.keys(doc?.props ?? {}).filter((p) => doc.props[p].tsType)
  if (!same(inCode, (contract.props ?? []).map((p) => p.name))) fail(`las props del código [${inCode}] no coinciden con las del contrato`)
  for (const prop of inCode) if (!doc.props[prop].description && prop !== 'children') fail(`la prop "${prop}" no tiene comentario`)
}

if (errors.length) {
  console.error(`Patrones: ${errors.length} problema(s)\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`Patrones: ${names.length} patrones, todos combinan solo componentes del sistema.`)
