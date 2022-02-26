/**
 * executes a series of test cases to make sure that the code given
 * has the desired behavior. This phase is executed after the strategy that
 * extracts: the code function, the name and the parameters. The strategy is in charge
 * of executing the parser, which give as a result a working code and the desired
 * structure.
 * @param {string} code 
 * @param {object} strategyResult 
 * @param {array} testCases 
 */
export const executeTestCase = function (code, strategyResult, testCases) {
  const result: boolean[] = [];
  for (const testCase of testCases) {
    try {
      const preExecution = `${code} ${strategyResult.name}(${testCase.params})`;
      /* eslint-disable-next-line */
      const execution = eval(preExecution);
      if (execution === testCase.expected) {
        result.push(true);
      }
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e);
      return false;
    }
  }

  return result.length === testCases.length;
};
