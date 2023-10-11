import { MouseEventHandler, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  extraClassName?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonComponent = (props: Props) => {
  const baseClassName = 'rounded-lg w-full bg-indigo-700 p-2 font-bold text-white hover:bg-blue-700';
  return (
    <div className='relative'>
      <button className={twMerge(baseClassName, props.extraClassName)} type={props.type} onClick={props.handleClick}>
        {props.children}
      </button>
    </div>
  );
};
