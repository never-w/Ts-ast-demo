import { ts, Project } from 'ts-morph'

const project = new Project()
const sourceFile = project.createSourceFile(
  'file.ts',
  `function fn() {
  return 121
}const a = 11`,
)

const fn = sourceFile.getFunction('fn')

fn.setBodyText("console.log('1')")

// const s = sourceFile.getStructure().statements

console.log(sourceFile.compilerNode)

sourceFile.getStructure()
