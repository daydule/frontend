import { AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { useGuestCheckQuery, useLazyGuestCheckQuery, useLogoutMutation } from '@/redux/auth/slice';
import { ButtonComponent } from '../atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';

const HeaderComponent = () => {
  const { data } = useGuestCheckQuery();
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
      <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
        <AiFillSchedule />
        <img src='/logo.png' className='ml-3' />
      </IconContext.Provider>
      {/* <デバック用> */}
      <div className='m-2'>
        <LinkComponent href={'/auth/login'} text='ログイン画面' />
      </div>
      <div className='m-2'>
        <LinkComponent href={'/auth/signup'} text='サインアップ画面' />
      </div>
      <div className='m-2'>
        <LinkComponent href={'/main'} text='メイン画面' />
      </div>
      <div className='mx-2'>isError: {data?.isError ? 'true' : 'false'}</div>
      <div className='mx-2'>isLogin: {data?.isLogin ? 'true' : 'false'}</div>
      <div className='mx-2'>isGuest: {data?.isGuest ? 'true' : 'false'}</div>
      {/* </デバック用> */}

      {data?.isLogin ? <ButtonComponent onClick={onClickLogout}>ログアウト</ButtonComponent> : null}
    </div>
  );
};

export default HeaderComponent;
