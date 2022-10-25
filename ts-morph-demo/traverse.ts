import { Project, ScriptTarget } from 'ts-morph'

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
})

const sourceFile = project.addSourceFileAtPath('demo/a.ts')

// sourceFiles.forEach(sourceFile => {
//   sourceFile.forEachDescendant(node => {
//     console.log(node.getFullText())
//   })
// })

// 等价上面遍历的函数 forEachDescendant
// function traverse(node: ts.Node) {
//   node.forEachChild(node => {
//     console.log(node.getFullText())
//     traverse(node)
//   })
// }
// traverse((sourceFile as unknown) as ts.Node)

sourceFile.forEachDescendant(node => {
  console.log(node.getFullText())
  return undefined
})
