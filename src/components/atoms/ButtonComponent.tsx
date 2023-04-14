import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  extraClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonComponent = (props: Props) => (
  <div className='relative'>
    <button
      className={
        props.extraClassName + ' ' + 'rounded-lg w-full bg-indigo-700 p-2 font-bold text-white hover:bg-blue-700'
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  </div>
);
