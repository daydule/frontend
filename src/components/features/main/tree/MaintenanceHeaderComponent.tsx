import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';

export const MaintenanceHeaderComponent = () => {
  return (
    <div className='fixed left-0 top-0 z-10 flex h-20 w-full items-center border-b bg-indigo-700 px-8 text-left text-3xl text-white shadow-xl'>
      <div className='my-0 ml-0 mr-5 flex duration-300'>
        <IconContext.Provider value={{ size: '1.5em', className: 'text-opacity-90' }}>
          <AiFillSchedule />
        </IconContext.Provider>
        <div className='mx-2 font-mono text-4xl font-extrabold transition ease-in-out'>daydule</div>
      </div>
    </div>
  );
};
