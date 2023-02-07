import { useGuestCheckQuery } from '@/redux/auth/slice';

const HeaderComponent: React.FC = () => {
  const { data } = useGuestCheckQuery();

  return (
    <div className='w-full h-24 bg-gray-300 border-b border-gray-200 pl-8 flex items-center text-left text-3xl text-blue-500'>
      <div className='mx-5'>daydule</div>
      <div className='mx-5'>isError: {data?.isError ? 'true' : 'false'}</div>
      <div className='mx-5'>isLogin: {data?.isLogin ? 'true' : 'false'}</div>
      <div className='mx-5'>isGuest: {data?.isGuest ? 'true' : 'false'}</div>
    </div>
  );
};

export default HeaderComponent;
