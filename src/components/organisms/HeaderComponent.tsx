import { RiAccountCircleFill } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { useLogoutMutation } from '@/redux/auth/slice';
import { useReadUserQuery } from '@/redux/user/slice';
import { useRouter } from 'next/router';
import { AiFillCaretDown, AiFillSchedule } from 'react-icons/ai';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { CONSTANT } from '@/config/const';
import { errorHandler } from '@/helpers/errorHandlerHelper';

export const HeaderComponent = () => {
  const router = useRouter();
  const { data: readUserResult, isError } = useReadUserQuery();
  const [logout] = useLogoutMutation();

  const handleClickLogout = async () => {
    try {
      await logout().unwrap().catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenderSignup = () => {
    router.push('/auth/signup');
  };

  const getNickName = () => {
    if (readUserResult?.user?.isGuest) {
      return CONSTANT.GUEST_NAME;
    }

    return readUserResult?.user?.nickname || readUserResult?.user?.email;
  };

  return (
    <div className='w-full h-20 fixed left-0 top-0 border-b shadow-xl px-8 flex items-center text-left text-3xl text-white bg-indigo-700 z-10'>
      <div className='my-0 ml-0 mr-auto flex' onClick={() => router.push('/main')}>
        <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
          <AiFillSchedule />
          <img src='/logo.png' className='ml-3' />
        </IconContext.Provider>
      </div>

      <div className='my-0 ml-auto mr-0 flex'>
        {!isError && <div className='mx-4 pt-1 text-lg'>ユーザネーム : {getNickName()}</div>}
        {!isError && (
          <Menu
            menuButton={
              <MenuButton>
                <div className='flex'>
                  <IconContext.Provider value={{ size: '1.2em', className: 'text-white text-opacity-90' }}>
                    <RiAccountCircleFill />
                  </IconContext.Provider>
                  <IconContext.Provider value={{ size: '0.5em', className: 'mt-3 text-white text-opacity-90' }}>
                    <AiFillCaretDown />
                  </IconContext.Provider>
                </div>
              </MenuButton>
            }
          >
            {readUserResult?.user?.isGuest && <MenuItem onClick={handleRenderSignup}>本登録</MenuItem>}
            {!readUserResult?.user?.isGuest && <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>}
          </Menu>
        )}
      </div>
    </div>
  );
};