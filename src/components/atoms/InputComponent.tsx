import { ReactComponentElement, ReactNode } from 'react';
import { IconContext } from 'react-icons/lib';

type Props = {
  id: string;
  name: string;
  type?: 'text' | 'password' | undefined;
  extraClassName?: string | undefined;
  value: string;
  placeholder?: string;
  icon: ReactNode;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

export const InputComponent: React.FC<Props> = (props) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value);
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
          className={props.extraClassName + ' ' + 'w-full border border-black text-base block pl-10 p-2.5 h-12'}
          placeholder={props.placeholder}
          onChange={inputHandler}
        />
      </div>
    </>
  );
};
