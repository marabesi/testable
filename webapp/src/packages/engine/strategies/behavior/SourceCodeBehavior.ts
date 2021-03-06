/**
 * This function receives the AST generated by esprimas and tries
 * to identify if the code given is a sum function, with two parameters
 * and a plus sign.
 * This function does not guarantee that the code given executes correctly, here
 * the goal is just to understand the function code.
 * @see src/engine/Reason.js
 * @see src/engine/Tester.js
 * @param {object} ast the abstract syntax tree generated by esprisma
 */
export const SourceCodeBehavior = function (ast) {
  let name, params, operator;

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

    if (!ast.body[node].body.body[0].argument) {
      return;
    }

    if (!ast.body[node].body.body[0].argument.operator) {
      return;
    }

    name = ast.body[node].id.name;
    params = ast.body[node].params;
    operator = ast.body[node].body.body[0].argument.operator;
  }

  return { name, params, operator };
};
