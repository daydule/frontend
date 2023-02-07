import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonComponent: React.FC<Props> = (props) => (
  <button
    className='rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
    type={props.type}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
