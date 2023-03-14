import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { useGuestCheckQuery, useLogoutMutation } from '@/redux/auth/slice';
import { ButtonComponent } from '../atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';
import { useReadQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';

const HeaderComponent = () => {
  const router = useRouter();
  const { data: guestCheckResult } = useGuestCheckQuery();
  const { data: readUserResult, isError } = useReadQuery();
  const [logout] = useLogoutMutation();

  const onClickLogout = async () => {
    try {
      await logout().unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='w-full h-20 fixed left-0 top-0 border-b border-white pl-8 flex items-center text-left text-3xl text-white bg-indigo-700'>
      <div className='flex' onClick={() => (guestCheckResult?.isLogin ? router.push('/main') : router.push('/'))}>
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
      <div className='mx-2 text-sm'>isError: {guestCheckResult?.isError ? 'true' : 'false'}</div>
      <div className='mx-2 text-sm'>isLogin: {guestCheckResult?.isLogin ? 'true' : 'false'}</div>
      <div className='mx-2 text-sm'>isGuest: {guestCheckResult?.isGuest ? 'true' : 'false'}</div>
      {/* </デバック用> */}

      {!isError && guestCheckResult?.isLogin ? (
        <div className='mx-4 text-sm'>user: {readUserResult?.user?.nickname || readUserResult?.user?.email}</div>
      ) : null}
      {guestCheckResult?.isLogin ? <ButtonComponent onClick={onClickLogout}>ログアウト</ButtonComponent> : null}
    </div>
  );
};

export default HeaderComponent;
