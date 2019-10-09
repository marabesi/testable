import { SourceCodeBehavior } from './SourceCodeBehavior';

export const SubtractionBehavior = function (ast) {

  const baseBehavior = SourceCodeBehavior(ast);

  if (baseBehavior && baseBehavior.operator !== '-') {
    return;
  }

  return baseBehavior;
};
