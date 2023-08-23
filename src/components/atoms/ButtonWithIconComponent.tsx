import { MouseEventHandler, ReactNode } from 'react';
import { IconContext } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

type Props = {
  type: 'button' | 'submit' | 'reset';
  icon: ReactNode;
  size: number;
  extraClassName?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonWithIconComponent = (props: Props) => {
  const baseClassName = 'pt-1 text-black text-opacity-20 hover:text-opacity-100';
  return (
    <div className='relative'>
      <button type={props.type} onClick={props.handleClick}>
        <IconContext.Provider
          value={{
            size: (props?.size ? props.size : 1.5) + 'rem',
            className: twMerge(baseClassName, props.extraClassName),
          }}
        >
          {props.icon}
        </IconContext.Provider>
      </button>
    </div>
  );
};
