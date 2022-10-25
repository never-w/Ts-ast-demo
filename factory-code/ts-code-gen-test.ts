import * as ts from 'typescript-4.0.2'
import fs from 'fs'
import { generateFactoryCode } from './factoryCodeGenerator-4.0.2'

const sourceFile = ts.createSourceFile('/file.ts', 'let a = 121', ts.ScriptTarget.Latest)
const factoryCode = generateFactoryCode(ts, sourceFile)

//-
fs.writeFileSync('./wyq.ts', `import ts, { factory } from 'typescript'; export const a = ` + factoryCode, {
  encoding: 'utf8',
})
