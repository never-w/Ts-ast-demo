import * as ts from 'typescript'

// js ----> .d.ts文件
function compile(fileNames: string[], options: ts.CompilerOptions): void {
  // Create a Program with an in-memory emit
  const createdFiles = {}
  const host = ts.createCompilerHost(options)
  // 这句代码注释掉会导致它给你生成对应的 .d.ts文件
  //  type WriteFileCallback = (
  //   fileName: string,
  //   text: string,
  //   writeByteOrderMark: boolean,
  //   onError?: (message: string) => void,
  //   sourceFiles?: readonly SourceFile[],
  //   data?: WriteFileCallbackData,
  // ) => void
  host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents)

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, options, host)
  program.emit()

  // Loop through all the input files
  fileNames.forEach((file) => {
    console.log('### JavaScript\n')
    console.log(host.readFile(file))

    console.log('### Type Definition\n')
    const dts = file.replace('.js', '.d.ts')
    console.log(createdFiles[dts])
  })
}

// Run the compiler
compile(['test-code/one.js', 'test-code/two.js'], {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
})
