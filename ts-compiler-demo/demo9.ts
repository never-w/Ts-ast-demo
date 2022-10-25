import { factory } from 'typescript'
import ts = require('typescript')

// 创建函数ast生成代码
function makeFactorialFunction() {
  const functionName = ts.factory.createIdentifier('fn')
  const paramName = ts.factory.createIdentifier('n')
  const parameter = ts.factory.createParameterDeclaration(
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName,
  )

  const condition = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.factory.createNumericLiteral(1),
  )

  const ifBody = ts.factory.createBlock(
    [ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))],
    /*multiline*/ true,
  )

  const decrementedArg = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.MinusToken,
    ts.factory.createNumericLiteral(1),
  )

  const recurse = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.factory.createCallExpression(functionName, /*typeArgs*/ undefined, [decrementedArg]),
  )

  const statements = [ts.factory.createIfStatement(condition, ifBody), ts.factory.createReturnStatement(recurse)]

  return ts.factory.createFunctionDeclaration(
    /*modifiers*/ [
      ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
      ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
    ],
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ undefined,
    [parameter],
    /*returnType*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.factory.createBlock(statements, /*multiline*/ true),
  )
}

const resultFile = ts.createSourceFile(
  'someFileName.ts',
  '',
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS,
)
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

// 改造的多个数组demo
const nodeList = [
  factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier('obj'),
          undefined,
          undefined,
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier('name'),
                factory.createObjectLiteralExpression(
                  [
                    factory.createPropertyAssignment(
                      factory.createIdentifier('age'),
                      factory.createNumericLiteral('22'),
                    ),
                  ],
                  true,
                ),
              ),
            ],
            true,
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  ),
  factory.createFunctionDeclaration(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword), factory.createModifier(ts.SyntaxKind.DefaultKeyword)],
    undefined,
    factory.createIdentifier('fn'),
    undefined,
    [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        factory.createIdentifier('n'),
        undefined,
        undefined,
        undefined,
      ),
    ],
    factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createIdentifier('n'),
            factory.createToken(ts.SyntaxKind.LessThanEqualsToken),
            factory.createNumericLiteral('1'),
          ),
          factory.createBlock([factory.createReturnStatement(factory.createNumericLiteral('1'))], true),
          undefined,
        ),
        factory.createReturnStatement(
          factory.createBinaryExpression(
            factory.createIdentifier('n'),
            factory.createToken(ts.SyntaxKind.AsteriskToken),
            factory.createCallExpression(factory.createIdentifier('fn'), undefined, [
              factory.createBinaryExpression(
                factory.createIdentifier('n'),
                factory.createToken(ts.SyntaxKind.MinusToken),
                factory.createNumericLiteral('1'),
              ),
            ]),
          ),
        ),
      ],
      true,
    ),
  ),
]
let result = ''
nodeList.forEach((node) => {
  result += printer.printNode(ts.EmitHint.Unspecified, node, resultFile)
})
console.log(result)

// 原本demo
// const result = printer.printNode(ts.EmitHint.Unspecified, makeFactorialFunction(), resultFile)
// console.log(result)
