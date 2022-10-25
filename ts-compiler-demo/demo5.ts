import { readFileSync } from 'fs'
import * as ts from 'typescript'

// 检查所有循环构造体是否由花括号括起来。
// 检查所有 if/else 主体是否被花括号括起来。
// 使用“更严格”的相等运算符（===/ !==）而不是“松散”的运算符（ ==/ !=）。
function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile)

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
        if ((node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block) {
          report(node, "A looping statement's contents should be wrapped in a block body.")
        }
        break

      case ts.SyntaxKind.IfStatement:
        // eslint-disable-next-line no-case-declarations
        const ifStatement = node as ts.IfStatement
        if (ifStatement.thenStatement.kind !== ts.SyntaxKind.Block) {
          report(ifStatement.thenStatement, "An if statement's contents should be wrapped in a block body.")
        }
        if (
          ifStatement.elseStatement &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.Block &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.IfStatement
        ) {
          report(ifStatement.elseStatement, "An else statement's contents should be wrapped in a block body.")
        }
        break

      case ts.SyntaxKind.BinaryExpression:
        // eslint-disable-next-line no-case-declarations
        const op = (node as ts.BinaryExpression).operatorToken.kind
        if (op === ts.SyntaxKind.EqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken) {
          report(node, "Use '===' and '!=='.")
        }
        break
    }

    ts.forEachChild(node, delintNode)
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart())
    console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`)
  }
}

const fileNames = ['test-code/one.ts']
fileNames.forEach((fileName) => {
  // Parse a file
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true,
  )

  // delint it
  delint(sourceFile)
})
