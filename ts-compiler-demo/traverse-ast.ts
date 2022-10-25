import * as ts from 'typescript'
import fs from 'fs'

const codeStr = fs.readFileSync('demo/index.tsx').toString()
const sourceFile = ts.createSourceFile('file.ts', codeStr, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX)

const strArr = []

function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile)
  function delintNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.StringLiteral && node.parent.kind === ts.SyntaxKind.CallExpression) {
      strArr.push(node.getText())
    }
    ts.forEachChild(node, delintNode)
  }
}
delint(sourceFile)

const resultArr = strArr.map(v => eval(v))
console.log(resultArr)
