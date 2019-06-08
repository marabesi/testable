export const SumBehavior = function (ast) {
  for (let node in ast.body) {
    if (ast.body[node].type !== 'FunctionDeclaration') {
      return;
    }
    
    const name = ast.body[node].id.name;

    for (let bodyItem in ast.body[node].body.body) {
      const type = ast.body[node].body.body[bodyItem].type;

      if (type === 'ReturnStatement') {
        const operator = ast.body[node].body.body[bodyItem].argument.operator;
        const left = ast.body[node].body.body[bodyItem].argument.left.name;
        const right = ast.body[node].body.body[bodyItem].argument.right.name;
        return { name, operator, left, right };
      }
    }
  }

  return;
};

export const testCase = function () {

};
