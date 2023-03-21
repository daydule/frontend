import { ReactNode } from 'react';
import { IconContext } from 'react-icons/lib';

type Props<T> = {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'number' | undefined;
  value: T;
  placeholder?: string;
  extraClassName?: string | undefined;
  setter: React.Dispatch<React.SetStateAction<T>>;
};

export const SimpleInputComponent = <T extends string | number>(props: Props<T>) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value as T);
  };

  return (
    <div className='relative'>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        className={
          props.extraClassName + ' ' + 'w-full border border-gray-200 shadow-md rounded-lg text-base block p-2.5 h-8'
        }
        placeholder={props.placeholder}
        onChange={inputHandler}
      />
    </div>
  );
};
