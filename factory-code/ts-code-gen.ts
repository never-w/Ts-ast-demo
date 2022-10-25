import * as fs from 'fs'
import { generateCode } from 'ts-factory-code-generator-generator'

const code = generateCode('typescript')
fs.writeFile('./factoryCodeGenerator.ts', code, (err) => {
  if (err) throw err
  console.log('The file has been saved!')
})

const codeFor4_0_2 = generateCode('typescript-4.0.2')
fs.writeFile('./factoryCodeGenerator-4.0.2.ts', codeFor4_0_2, (err) => {
  if (err) throw err
  console.log('The file has been saved!')
})
