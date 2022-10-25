import * as ts from 'typescript'
import * as path from 'path'

function createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[]): ts.CompilerHost {
  return {
    getSourceFile,
    getDefaultLibFileName: () => 'lib.d.ts',
    writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getDirectories: (path) => ts.sys.getDirectories(path),
    getCanonicalFileName: (fileName) => (ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase()),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    fileExists,
    readFile,
    resolveModuleNames,
  }

  function fileExists(fileName: string): boolean {
    return ts.sys.fileExists(fileName)
  }

  function readFile(fileName: string): string | undefined {
    return ts.sys.readFile(fileName)
  }

  function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = ts.sys.readFile(fileName)
    return sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion) : undefined
  }

  function resolveModuleNames(moduleNames: string[], containingFile: string): ts.ResolvedModule[] {
    const resolvedModules: ts.ResolvedModule[] = []
    for (const moduleName of moduleNames) {
      // try to use standard resolution
      const result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile,
      })
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule)
      } else {
        // check fallback locations, for simplicity assume that module at location
        // should be represented by '.d.ts' file
        for (const location of moduleSearchLocations) {
          const modulePath = path.join(location, moduleName + '.d.ts')
          if (fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath })
          }
        }
      }
    }
    return resolvedModules
  }
}

function compile(sourceFiles: string[], moduleSearchLocations: string[]): void {
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.AMD,
    target: ts.ScriptTarget.ES5,
  }
  const host = createCompilerHost(options, moduleSearchLocations)
  const program = ts.createProgram(sourceFiles, options, host)

  /// do something with program...
}
