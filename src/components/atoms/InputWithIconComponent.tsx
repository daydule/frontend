import { ReactNode } from 'react';
import { IconContext } from 'react-icons/lib';

type Props<T> = {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'number' | undefined;
  value: T;
  placeholder?: string;
  icon: ReactNode;
  extraClassName?: string | undefined;
  setter: React.Dispatch<React.SetStateAction<T>>;
};

export const InputWithIconComponent = <T extends string | number>(props: Props<T>) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value as T);
  };

  return (
    <>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <IconContext.Provider value={{ size: '1.6em', className: 'text-gray-600 text-opacity-60' }}>
            {props.icon}
          </IconContext.Provider>
        </div>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          value={props.value}
          className={props.extraClassName + ' ' + 'w-full border border-black text-base block pl-10 p-2.5 h-12'}
          placeholder={props.placeholder}
          onChange={inputHandler}
        />
      </div>
    </>
  );
};
