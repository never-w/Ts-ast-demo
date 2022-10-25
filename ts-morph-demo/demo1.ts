import { Project, ScriptTarget, StructureKind } from 'ts-morph'

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
})

// 创建 源文件
const sourceFile = project.createSourceFile(
  'path/myStructureFile.ts',
  {
    statements: [
      {
        kind: StructureKind.Enum,
        name: 'MyEnum',
        members: [
          {
            name: 'member',
          },
        ],
      },
      {
        kind: StructureKind.Class,
        name: 'MyClass',
      },
    ],
  },
  { overwrite: true },
)

sourceFile.saveSync()
