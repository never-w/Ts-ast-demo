import { Project, ScriptTarget } from 'ts-morph'

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
})
// TODO:tsConfigFilePath: 'tsconfig.json'，new Project()必须引入tsconfig.json配置文件才能起作用
const sourceFile = project.getSourceFile('demo/b.ts')

// 监听源文件代码信息报错实列
const diagnostics = sourceFile.getPreEmitDiagnostics()
console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

// diagnostics.forEach(diagnostic => {
//   console.log(diagnostic.getSourceFile(), ' ===')
// })
