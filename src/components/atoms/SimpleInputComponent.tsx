import { ReactNode, forwardRef } from 'react';
import { IconContext } from 'react-icons/lib';

type Props = {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'number' | undefined;
  value: string;
  placeholder?: string;
  extraClassName?: string | undefined;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line react/display-name
export const SimpleInputComponent = forwardRef((props: Props, ref: React.Ref<HTMLInputElement>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setter(event.target.value);
  };

  return (
    <div className='relative'>
      <input
        ref={ref}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        className={
          props.extraClassName + ' ' + 'w-full border border-gray-200 shadow-md rounded-lg text-base block p-2.5 h-8'
        }
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
});
