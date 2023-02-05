import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';

const HeaderComponent: React.FC = () => {
  return (
    <div className='w-full h-20 border-b border-black pl-8 flex items-center text-left text-3xl text-white bg-indigo-700'>
      <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
        <AiFillSchedule />
        <img src='/logo.png' className='ml-3' />
      </IconContext.Provider>
    </div>
  );
};

export default HeaderComponent;