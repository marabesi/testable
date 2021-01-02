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
    name = ast.body[node].id.name;
    params = ast.body[node].params;
    operator = '/';

    const block = ast.body[node].body.body;

    if (!block) {
      return;
    }

    const ifs = block.filter(item => item.type === 'IfStatement');

    if (ifs.length < 2 && !checkInlineIf(ifs, params)) {
      return;
    }

    if (ifs.length >= 2 && !checkBlockIf(ifs, params)) {
      return;
    }
  }

  return { name, params, operator };
};

function checkInlineIf(block, params) {
  const paramsName = params.map(item => item.name);

  for (let leaf = 0; leaf < block.length; leaf++) {
    if (block[leaf].type !== 'IfStatement') {
      continue;
    }

    const currentNode = block[leaf].test;

    if (!currentNode) {
      return false;
    }

    if (!(currentNode.left.operator === '==' || currentNode.right.operator === '===')) {
      return false;
    }

    if (currentNode.left.right.value !== 0) {
      return false;
    }

    if (currentNode.right.right.value !== 0) {
      return false;
    }

    if (!(paramsName.includes(currentNode.left.left.name) || paramsName.includes(currentNode.right.left.name))) {
      return false;
    }
  }

  return true;
}

function checkBlockIf(block, params) {
  const paramsName = params.map(item => item.name);

  for (let leaf = 0; leaf < block.length; leaf++) {
    if (block[leaf].type !== 'IfStatement') {
      continue;
    }

    const currentNode = block[leaf].test;

    if (!currentNode) {
      return false;
    }

    if (!(currentNode.operator === '==' || currentNode.operator === '===')) {
      return false;
    }

    if (currentNode.right.value !== 0) {
      return false;
    }

    if (!(paramsName.includes(currentNode.left.name))) {
      return false;
    }
  }

  return true;
}
