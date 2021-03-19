import { MouseEventHandler } from 'react';
import config from '../../../../config';

interface Props {
  onClick: MouseEventHandler<HTMLInputElement>;
  value: string;
}

export default function Debug(props: Props) {
  return (
    <>
      {config.isDebug && <input type="button" className="bg-white m-2" {...props} />}
    </>
  );
}