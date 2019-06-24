const esprima = require('esprima');

/**
 * Parses the javascript code with esprimas and executes the desired strategy
 * function.
 * @param {string} code plain javascript code
 * @param {function} strategy the desired strategy to be applied on the code
 */
const reason = function (code, strategy) {
  try {
    const ast = esprima.parseScript(code);

    if (ast.body.length > 0) {
      return strategy(ast);
    }
  } catch (error) {
    /* eslint-disable-next-line */
    console.warn(error);
    return false;
  }
};

export default reason;
