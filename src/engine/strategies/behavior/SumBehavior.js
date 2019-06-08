var name, params;

export const SumBehavior = function (ast) {
  for (let node in ast.body) {
    if (!ast.body[node].type === 'FunctionDeclaration') {
      return;
    }
  }

  return { name, params };
};

export const testCase = function () {

};
