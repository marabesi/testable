import { SourceCodeBehavior } from './SourceCodeBehavior';

export const DivisionBehavior = function (ast) {

  const baseBehavior = SourceCodeBehavior(ast);

  if (baseBehavior && baseBehavior.operator !== '/') {
    return;
  }

  return baseBehavior;
};

export const DivisionByZeroBehavior = function (ast) {
  const regularDivision = DivisionBehavior(ast);
  if (regularDivision) {
    return;
  }

  let name, params, operator;

  for (let node in ast.body) {
    const block = ast.body[node].body.body;

    if (!block) {
      return;
    }

    for (let leaf = 0; leaf < block.length; leaf++) {
      if (block[leaf].type !== 'IfStatement') {
        continue;
      }

      const currentNode = block[leaf].test;

      if (!currentNode) {
        return;
      }

      if (!(currentNode.left.operator === '==' || currentNode.left.operator === '===')) {
        return;
      }

      if (currentNode.left.right.value !== 0) {
        return;
      }

      if (currentNode.right.right.value !== 0) {
        return;
      }
    }

    name = ast.body[node].id.name;
    params = ast.body[node].params;
    operator = '/';
  }

  return { name, params, operator };
};
