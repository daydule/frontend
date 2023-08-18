import { ReactNode, RefObject } from 'react';
import { IconContext } from 'react-icons/lib';

type Props = {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'number' | undefined;
  placeholder?: string;
  icon: ReactNode;
  extraClassName?: string;
  customRef: RefObject<HTMLInputElement>;
};

export const InputWithIconComponent = (props: Props) => {
  return (
    <>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <IconContext.Provider value={{ size: '1.6em', className: 'text-gray-600 text-opacity-60' }}>
            {props.icon}
          </IconContext.Provider>
        </div>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          className={props.extraClassName + ' ' + 'w-full border border-black text-base block pl-10 p-2.5 h-12'}
          placeholder={props.placeholder}
          ref={props.customRef}
        />
      </div>
    </>
  );
};
