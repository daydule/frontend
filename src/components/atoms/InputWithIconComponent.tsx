import React, { ReactNode } from 'react';
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
  handleSubmit: () => void;
};

export const InputWithIconComponent = <T extends string | number>(props: Props<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value as T);
  };
  const handleEnterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 予測変換時に押されるEnter及びEnter以外のキーが押された場合は何もしない
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    props.handleSubmit();
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
          onChange={handleChange}
          onKeyDown={handleEnterLogin}
        />
      </div>
    </>
  );
};
