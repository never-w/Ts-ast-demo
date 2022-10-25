import { ts, Project } from 'ts-morph'

const project = new Project()
const sourceFile = project.createSourceFile(
  'Example.ts',
  `
class C1 {
    myMethod() {
        function nestedFunction() {
        }
    }
}

class C2 {
    prop1: string;
}

const obj = {
    name:"wyq"
}

function f1() {
    console.log("1");

    function nestedFunction() {
    }
}`,
)

sourceFile.transform(traversal => {
  // this will skip visiting the children of the classes
  if (ts.isClassDeclaration(traversal.currentNode)) return traversal.currentNode

  const node = traversal.visitChildren()

  if (ts.isFunctionDeclaration(node)) {
    return traversal.factory.updateFunctionDeclaration(
      node,
      [],
      undefined,
      traversal.factory.createIdentifier('newName'),
      [],
      [],
      undefined,
      traversal.factory.createBlock([]),
    )
  }

  if (ts.isPropertyAssignment(node.parent) && ts.isStringLiteral(node)) {
    console.log(node.getText())

    return node
  }

  return node
})

// console.log(sourceFile.getText())
