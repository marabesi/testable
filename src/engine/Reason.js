const esprima = require('esprima');

const reason = function (code, strategy) {
  const ast = esprima.parseScript(code);

  if (ast.body.length > 0) {
    return strategy(ast);
  }
};

export default reason;
