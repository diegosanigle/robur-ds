// Revisa un trozo de interfaz (JSX) contra el sistema. No ejecuta el código: lo lee.
// Lo usan el MCP (validate_code), la comprobación de uso (check-usage) y los evals.
// `data` es el contenido de mcp/data.json.

const RAW = { button: 'Button', input: 'Input o Checkbox', select: 'Chip o Tabs', textarea: 'Input', dialog: 'Sheet' }
const DESIGN = /^(bg|text|border|rounded|shadow|ring|outline|fill|stroke)-(.+)$/
// Clases que empiezan igual que las de diseño pero son de disposición o de forma, no de aspecto.
const NEUTRAL = {
  text: /^(left|center|right|justify|wrap|nowrap|balance|pretty|ellipsis|clip)$/,
  bg: /^(transparent|current|inherit|none)$/,
  border: /^(\d+|[trblxyse](-\d+)?|dashed|dotted|solid|none|collapse|separate|transparent|current)$/,
  rounded: /^$/,
  shadow: /^none$/,
  ring: /^(\d+|inset|offset-\d+)$/,
  outline: /^(\d+|none|hidden|dashed|dotted|offset-\d+)$/,
  fill: /^(none|current)$/,
  stroke: /^(none|current|\d+)$/,
}
const BLAME = /\b(objetivos?|metas?|fallaste|fallado|fracas\w+|no has (entrenado|cumplido|hecho)|deberías|te falta[n]?)\b|¡/i

export function validate(code, data, { level = 'screen' } = {}) {
  const issues = []
  const add = (rule, severity, message, index) =>
    issues.push({ rule, severity, message, line: index === undefined ? undefined : code.slice(0, index).split('\n').length })
  const pieces = { ...data.components, ...data.patterns }

  // 1. Valores a mano.
  for (const m of code.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) add('no-hex', 'error', `Color a mano ${m[0]}: usa una clase de token (get_tokens).`, m.index)
  for (const m of code.matchAll(/(?<![\w-])[a-z][\w:-]*-\[[^\]]+\]/g)) add('no-arbitrary', 'error', `Valor arbitrario "${m[0]}": usa una clase de la escala o propón un token.`, m.index)
  if (level !== 'component') {
    for (const m of code.matchAll(/style=\{\{/g)) add('no-inline-style', 'error', 'Estilo en línea: usa clases de tokens.', m.index)
  }

  // 2. Clases de diseño que no existen en el sistema.
  for (const literal of code.matchAll(/(['"`])((?:(?!\1)[^\\\n]|\\.)*)\1/g)) {
    for (const word of literal[2].split(/\s+/)) {
      const cls = word.split(':').pop().split('/')[0]
      const match = DESIGN.exec(cls)
      if (!match || !/^[a-z0-9-]+$/.test(cls)) continue
      const [, prefix, rest] = match
      const side = prefix === 'rounded' ? rest.replace(/^[trblse]{1,2}-/, '') : rest
      if (data.classes.includes(`${prefix}-${side}`) || data.classes.includes(cls) || NEUTRAL[prefix].test(rest)) continue
      add('unknown-class', 'error', `La clase "${cls}" no existe en el sistema. Consulta get_tokens.`, literal.index)
    }
  }
  if (level === 'component') return issues

  // 3. Controles dibujados a mano.
  for (const m of code.matchAll(/<(button|input|select|textarea|dialog)[\s>/]/g)) {
    add('no-raw-control', 'error', `<${m[1]}> dibujado a mano: usa ${RAW[m[1]]}.`, m.index)
  }

  // 4. Piezas y props que no existen.
  const local = new Set([...code.matchAll(/(?:function|const|class)\s+([A-Z]\w*)/g)].map((m) => m[1]))
  for (const m of code.matchAll(/<([A-Z]\w*)((?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'|\{(?:[^{}]|\{[^{}]*\})*\}))?)*)\s*\/?>/g)) {
    const name = m[1]
    // Las expresiones entre llaves se vacían: su contenido no son props.
    const attrs = m[2].replace(/\{(?:[^{}]|\{[^{}]*\})*\}/g, '{}')
    const piece = pieces[name]
    if (!piece) {
      if (!local.has(name) && name !== 'Fragment') add('unknown-component', 'error', `<${name}> no existe en el sistema. Mira get_catalog; si falta, proponlo.`, m.index)
      continue
    }
    for (const attr of attrs.matchAll(/\s([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|\{))?/g)) {
      const prop = piece.props.find((p) => p.name === attr[1])
      const value = attr[2] ?? attr[3]
      if (!prop) {
        if (!piece.extends && !['key', 'ref'].includes(attr[1])) add('unknown-prop', 'error', `${name} no tiene la prop "${attr[1]}". Props: ${piece.props.map((p) => p.name).join(', ')}.`, m.index)
      } else if (prop.type === 'enum' && value !== undefined && !prop.values.includes(value)) {
        add('invalid-value', 'error', `${name}: ${attr[1]}="${value}" no existe. Valores: ${prop.values.join(', ')}.`, m.index)
      }
    }
    for (const prop of piece.props.filter((p) => p.required && p.name !== 'children')) {
      if (!new RegExp(`\\s${prop.name}[=\\s/>]`).test(`${attrs} `) && !/\{\.\.\./.test(attrs)) add('missing-prop', 'error', `A ${name} le falta la prop obligatoria "${prop.name}".`, m.index)
    }
  }

  // 5. Reglas de composición que se pueden contar.
  const tags = (name) => [...code.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'g'))].map((m) => m[1])
  const primaries = tags('Button').filter((a) => !/variant=/.test(a) || /variant=["']primary/.test(a)).length
  if (primaries > 1) add('one-primary', 'warning', `Hay ${primaries} botones primary. La regla es uno por pantalla.`)
  const inverse = [...tags('Card'), ...tags('StatCard')].filter((a) => /variant=["']inverse/.test(a)).length
  if (inverse > 1) add('one-inverse', 'warning', `Hay ${inverse} tarjetas inverse. La regla es como mucho una por pantalla.`)

  // 6. Textos: Robur registra, no juzga.
  for (const m of code.matchAll(/>([^<>{}]+)</g)) {
    const found = BLAME.exec(m[1])
    if (found) add('neutral-copy', 'warning', `Texto "${m[1].trim()}": "${found[0]}" suena a meta, a fallo o a exclamación. Robur registra, no juzga.`, m.index)
  }
  for (const m of code.matchAll(/\b(?:title|description|label|hint|error|actionLabel|submitLabel)="([^"]+)"/g)) {
    const found = BLAME.exec(m[1])
    if (found) add('neutral-copy', 'warning', `Texto "${m[1]}": "${found[0]}" suena a meta, a fallo o a exclamación. Robur registra, no juzga.`, m.index)
  }
  return issues
}

export const format = (issues) =>
  issues.length
    ? issues.map((i) => `${i.severity === 'error' ? '✗' : '!'} [${i.rule}]${i.line ? ` línea ${i.line}:` : ''} ${i.message}`).join('\n')
    : '✓ Sin problemas: el código usa solo piezas y clases del sistema.'
