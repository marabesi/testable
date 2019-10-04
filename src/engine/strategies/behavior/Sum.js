import { SourceCodeBehavior } from './SourceCodeBehavior';

export const Sum = function (ast) {

  const baseBehavior = SourceCodeBehavior(ast);

  if (baseBehavior && baseBehavior.operator !== '+') {
    return;
  }

  return baseBehavior;
};

export const testCase = [
  { params: '1,2', expected: 3 },
  { params: '1,1', expected: 2 },
];
