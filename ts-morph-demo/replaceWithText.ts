// 用新文本替换任何节点
import { Project, ScriptTarget, VariableDeclarationKind } from 'ts-morph'

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
})

const sourceFile = project.getSourceFileOrThrow('demo/a.ts')
console.log(sourceFile.getText())

// 替换文本
const originalInitializer = sourceFile.getVariableDeclarations()[0].getInitializerOrThrow()
originalInitializer.replaceWithText('21312123123')

sourceFile.addVariableStatement({
  declarationKind: VariableDeclarationKind.Const, // defaults to "let"
  declarations: [
    {
      name: 'myNumber',
      initializer: '5',
    },
    {
      name: 'myString',
      type: 'string',
      initializer: `'my string'`,
    },
  ],
})

console.log(sourceFile.getText())
