import * as ts from 'typescript'

// Ts ---》 js
const source = "let x: string = 'string'"
const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })

console.dir(JSON.stringify(result), { depth: null })
