var name, params;

export const SourceCodeBehavior = function (ast) {
  for (let node in ast.body) {
    if (ast.body[node].type !== 'FunctionDeclaration') {
      return;
    }

    if (!ast.body[node].params) {
      return;
    }

    if (ast.body[node].params.length !== 2) {
      return;
    }

    if (!ast.body[node].body.body[0].argument.operator) {
      return;
    }

    name = ast.body[node].id.name;
    params = ast.body[node].params;
  }

  return { name, params };
};
