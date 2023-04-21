import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { useLogoutMutation } from '@/redux/auth/slice';
import { ButtonComponent } from '../atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';
import { useReadUserQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';

const HeaderComponent = () => {
  const router = useRouter();
  const { data: readUserResult, isError } = useReadUserQuery();
  const [logout] = useLogoutMutation();

  const handleClickLogout = async () => {
    try {
      await logout().unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='w-full h-20 fixed left-0 top-0 border-b shadow-xl pl-8 flex items-center text-left text-3xl text-white bg-indigo-700 z-10'>
      <div className='flex' onClick={() => router.push('/main')}>
        <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
          <AiFillSchedule />
          <img src='/logo.png' className='ml-3' />
        </IconContext.Provider>
      </div>

      {/* <デバック用> */}
      <div className='mx-2 text-sm'>
        <LinkComponent href={'/auth/login'} text='/auth/login' />
      </div>
      <div className='mx-2 text-sm'>
        <LinkComponent href={'/auth/signup'} text='/auth/signup' />
      </div>
      <div className='mx-2 text-sm'>
        <LinkComponent href={'/main'} text='/main' />
      </div>
      <div className='mx-2 text-sm'>
        <LinkComponent href={'/individualSettings'} text='/individualSettings' />
      </div>
      {/* </デバック用> */}

      {!isError && (
        <div className='mx-4 text-sm'>user: {readUserResult?.user?.nickname || readUserResult?.user?.email}</div>
      )}
      {!isError && (
        <ButtonComponent handleClick={handleClickLogout} type={'button'}>
          ログアウト
        </ButtonComponent>
      )}
    </div>
  );
};

export default HeaderComponent;
