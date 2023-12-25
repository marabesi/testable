import { ReactNode } from 'react';

const Title = ({children, ...props }: { children: ReactNode }) => {
  return (
    <h1 className="uppercase flex justify-between items-center text-blue-lightest p-5 h-16" { ...props }>
      { children }
    </h1>
  );
};

export default Title;
