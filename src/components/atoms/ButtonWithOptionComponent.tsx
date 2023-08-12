import { MouseEventHandler, ReactNode, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiFillCaretDown } from 'react-icons/ai';

type Props = {
  typeForMainButton: 'button' | 'submit' | 'reset';
  typeForOptionButton: 'button' | 'submit' | 'reset';
  children: ReactNode;
  extraClassName?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleClickOption?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonWithOptionComponent = (props: Props) => (
  <div className={props.extraClassName + ' ' + 'flex'}>
    <button
      className='w-5/6 rounded-l-lg border-r-2 border-r-white bg-indigo-700 p-2 font-bold text-white hover:bg-blue-700'
      type={props.typeForMainButton}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
    <button
      className='w-1/6 rounded-r-lg bg-indigo-700 font-bold text-white hover:bg-blue-700'
      type={props.typeForOptionButton}
      onClick={props.handleClickOption}
    >
      <IconContext.Provider value={{ size: '1.5rem', className: 'mx-auto' }}>
        <AiFillCaretDown />
      </IconContext.Provider>
    </button>
  </div>
);
