const esprima = require('esprima');

const reason = function (code, strategy) {
  try {
    const ast = esprima.parseScript(code);
    
    if (ast.body.length > 0) {
      return strategy(ast);
    }
  } catch (error) {
    return {};
  }
};

export default reason;
