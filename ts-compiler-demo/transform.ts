import * as ts from 'typescript'
import { EmitHint, LiteralType, SourceFile } from 'typescript'

// 获取到ast
const filename = './test-code/one.ts'
const program = ts.createProgram([filename], {})
const sourceFile = program.getSourceFile(filename) as SourceFile

// 对ast转 换
const typeChecker = program.getTypeChecker()
const { transformed } = ts.transform(sourceFile, [
  function(context) {
    return function(node) {
      return ts.visitNode(node, visit)

      function visit(node) {
        if (ts.isTypeReferenceNode(node)) {
          const type = typeChecker.getTypeFromTypeNode(node) as LiteralType

          if (type.value) {
            ts.addSyntheticTrailingComment(node, ts.SyntaxKind.SingleLineCommentTrivia, type.value as string)
          }
        }

        return ts.visitEachChild(node, visit, context)
      }
    }
  },
])

// 打印修改后的code
const printer = ts.createPrinter()
const code = printer.printNode(EmitHint.SourceFile, transformed[0], transformed[0])
console.log(code)
