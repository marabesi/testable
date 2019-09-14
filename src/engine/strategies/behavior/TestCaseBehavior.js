export const testCaseBehavior = function (ast) {
  let name = '';
  let funcUnderTestName = '';
  let funcUnderTestParams = {};

  for (let node in ast.body) {
    if (ast.body[node].type !== 'FunctionDeclaration') {
      return;
    }

    const body = ast.body[node].body.body;

    name = ast.body[node].id.name;

    const variables =  body.filter(statement => statement.type === 'VariableDeclaration');

    const funcUnderTest = variables.filter(variable => {
      return variable.declarations.filter(declaration => {
        return declaration.init.type === 'CallExpression';
      }).length > 0;
    });

    if (!funcUnderTest[0]) {
      return;
    }

    const funcUnderTestDescription = funcUnderTest[0].declarations[0];

    if (funcUnderTestDescription.init.callee.name) {
      funcUnderTestName = funcUnderTestDescription.init.callee.name;
    }

    if (funcUnderTestDescription.init) {
      funcUnderTestParams = funcUnderTestDescription.init.arguments.map(item => item.raw);
    }

    const returnStatement = body.filter(statement => statement.type === 'ReturnStatement')[0];

    if (returnStatement.argument.operator !== '===') {
      return;
    }

    if (returnStatement.argument.left.name === returnStatement.argument.right.name) {
      return;
    }

    return { name, funcUnderTestName, funcUnderTestParams };
  }
};

export const testCase = [
  { params: '', expected: true }
];
