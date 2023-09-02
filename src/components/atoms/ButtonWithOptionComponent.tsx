import { MouseEventHandler, ReactNode, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiFillCaretDown } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

type Props = {
  typeForMainButton: 'button' | 'submit' | 'reset';
  typeForOptionButton: 'button' | 'submit' | 'reset';
  children: ReactNode;
  extraClassName?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleClickOption?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonWithOptionComponent = (props: Props) => {
  const baseClassName = 'flex text-white';
  return (
    <div className={twMerge(baseClassName, props.extraClassName)}>
      <button
        className='rounded-l-lg border-r-2 border-r-white bg-indigo-700 p-2 font-bold hover:bg-blue-700'
        type={props.typeForMainButton}
        onClick={props.handleClick}
      >
        {props.children}
      </button>
      <button
        className='w-8 rounded-r-lg bg-indigo-700 font-bold hover:bg-blue-700'
        type={props.typeForOptionButton}
        onClick={props.handleClickOption}
      >
        <IconContext.Provider value={{ size: '1em', className: 'm-auto text-opacity-90' }}>
          <AiFillCaretDown />
        </IconContext.Provider>
      </button>
    </div>
  );
};
