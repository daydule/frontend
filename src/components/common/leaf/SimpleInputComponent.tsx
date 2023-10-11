import { ReactNode, forwardRef } from 'react';
import { IconContext } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

type Props = {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'number' | undefined;
  value: string;
  placeholder?: string;
  extraClassName?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line react/display-name
export const SimpleInputComponent = forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value);
  };

  const baseClassName = 'block h-8 w-full rounded-lg border border-gray-200 p-2.5 text-base shadow-md';
  return (
    <div className='relative'>
      <input
        ref={ref}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        className={twMerge(baseClassName, props.extraClassName)}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
});
