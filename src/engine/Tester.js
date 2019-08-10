/**
 * executes a series of test cases to make sure that the code given
 * has the desired behavior. This phase is executed after the strategy that
 * extract the code function name and parameters, the strategy is in charge
 * of execute the parser, which give as a result a working code and the desired
 * structure.
 * @param {string} code 
 * @param {object} strategyResult 
 * @param {array} testCases 
 */
export const executeTestCase = function (code, strategyResult, testCases) {
  const result = [];
console.log(code, strategyResult, testCases)
  for (const testCase of testCases) {
    try {
      const preExecution = `${code} ${strategyResult.name}(${testCase.params})`;
      console.log(preExecution)
      /* eslint-disable-next-line */
      const execution = eval(preExecution);
console.log(execution)
      if (execution === testCase.expected) {
        result.push(true);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  if (result.length === testCases.length) {
    return true;
  }

  return false;
};
