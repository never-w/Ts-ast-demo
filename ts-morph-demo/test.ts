import { Project, ScriptTarget } from 'ts-morph'

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
originalInitializer.replaceWithText('{name:"wyq"}')

const myEnum = sourceFile.getEnum('MyEnum')
myEnum.rename('SomeOtherName')
myEnum.remove()

sourceFile.getVariableDeclarations()[0].rename('b', {
  usePrefixAndSuffixText: true,
})

// const classDeclaration = sourceFile.addClass({ name: 'MyClass' })
// const referencedSymbols = classDeclaration.findReferences()
// for (const referencedSymbol of referencedSymbols) {
//   for (const reference of referencedSymbol.getReferences()) {
//     console.log('---------')
//     console.log('REFERENCE')
//     console.log('---------')
//     console.log('File path: ' + reference.getSourceFile().getFilePath())
//     console.log('Start: ' + reference.getTextSpan().getStart())
//     console.log('Length: ' + reference.getTextSpan().getLength())
//     console.log(
//       'Parent kind: ' +
//         reference
//           .getNode()
//           .getParentOrThrow()
//           .getKindName(),
//     )
//     console.log('\n')
//   }
// }

console.log(sourceFile)
