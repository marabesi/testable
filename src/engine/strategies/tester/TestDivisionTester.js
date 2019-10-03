export const testCase = [
  { params: '2,1', expected: true },
  { params: '4,2', expected: true }
];

export const testCaseDivisionByZero = [
  ...testCase,
  // { params: '1,0', expected: false },
  { params: '0,1', expected: false },
  // { params: '0,0', expected: false }
];
