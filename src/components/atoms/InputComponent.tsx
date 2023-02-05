import { MouseEventHandler } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';

type Props = {
  type?: 'text' | 'password' | undefined;
  text?: string;
  placeholder?: string;
  iconType?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const getIcon = (type?: string) => {
  switch (type) {
    case 'AiOutlineMail':
      return <AiOutlineMail />;
    case 'RiLock2Line':
      return <RiLock2Line />;
    default:
      <div></div>;
  }
};

export const InputComponent: React.FC<Props> = (props) => {
  const icon = getIcon(props.iconType);

  return (
    <>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <IconContext.Provider value={{ size: '1.6em', className: 'text-gray-600 text-opacity-60' }}>
            {icon}
          </IconContext.Provider>
        </div>
        <input
          type={props.type}
          className='w-full border border-black text-base block pl-10 p-2.5 h-12'
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
};
