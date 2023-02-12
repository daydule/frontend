import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { useGuestCheckQuery } from '@/redux/auth/slice';

const HeaderComponent: React.FC = () => {
  const { data } = useGuestCheckQuery();

  return (
    <div className='w-full h-20 border-b border-white pl-8 flex items-center text-left text-3xl text-white bg-indigo-700'>
      <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
        <AiFillSchedule />
        <img src='/logo.png' className='ml-3' />
      </IconContext.Provider>
      {/* <div className='mx-5'>isError: {data?.isError ? 'true' : 'false'}</div>
      <div className='mx-5'>isLogin: {data?.isLogin ? 'true' : 'false'}</div>
      <div className='mx-5'>isGuest: {data?.isGuest ? 'true' : 'false'}</div> */}
    </div>
  );
};

export default HeaderComponent;
