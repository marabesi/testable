import { SourceCodeBehavior } from './SourceCodeBehavior';

export const DivisionBehavior = function (ast) {

  const baseBehavior = SourceCodeBehavior(ast);

  if (baseBehavior && baseBehavior.operator !== '/') {
    return;
  }

  return baseBehavior;
};

export const DivisionByZeroBehavior = function (ast) {
};
