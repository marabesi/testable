import { SourceCodeBehavior } from './SourceCodeBehavior';

export const MultiplicationBehavior = function (ast) {

  const baseBehavior = SourceCodeBehavior(ast);

  if (baseBehavior && baseBehavior.operator !== '*') {
    return;
  }

  return baseBehavior;
};
