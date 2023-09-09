import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { useRouter } from 'next/router';
import { AiFillCaretDown, AiFillSchedule } from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { RiAccountCircleFill } from 'react-icons/ri';
import { CONSTANT } from '@/constant/default';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useLogoutMutation } from '@/redux/auth/slice';
import { useReadUserQuery } from '@/redux/user/slice';
import '@szhsin/react-menu/dist/index.css';

export const HeaderComponent = () => {
  const router = useRouter();
  const { data: readUserResult, isError } = useReadUserQuery();
  const [logout] = useLogoutMutation();
  const isAboutPage = router.pathname === '/about';

  const handleClickLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => router.push('about'))
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenderUsage = () => {
    router.push('/usage');
  };

  const handleRenderSignup = () => {
    router.push('/auth/signup');
  };

  const handleClickFeedback = () => {
    window.open('https://forms.gle/DA55AYirvSCcw3DX9');
  };

  const getNickName = () => {
    if (readUserResult?.user?.isGuest) {
      return CONSTANT.GUEST_NAME;
    }

    return readUserResult?.user?.nickname || readUserResult?.user?.email;
  };

  return (
    <div className='fixed left-0 top-0 z-10 flex h-20 w-full items-center border-b bg-indigo-700 px-8 text-left text-3xl text-white shadow-xl'>
      <div
        className='my-0 ml-0 mr-5 flex cursor-pointer duration-300'
        onClick={() => (isError ? router.push('/auth/login') : router.push('/main'))}
      >
        <IconContext.Provider value={{ size: '1.5em', className: 'text-opacity-90' }}>
          <AiFillSchedule />
        </IconContext.Provider>
        <div className='mx-2 font-mono text-4xl font-extrabold transition ease-in-out'>daydule</div>
      </div>
      {isAboutPage && isError && (
        <div
          className='mx-2 cursor-pointer text-base duration-300 hover:scale-105 hover:text-gray-300'
          onClick={() => router.push('/auth/login')}
        >
          ログイン画面へ
        </div>
      )}
      {!isAboutPage && (
        <div
          className='mx-2 cursor-pointer text-base duration-300 hover:scale-105 hover:text-gray-300'
          onClick={() => router.push('/about')}
        >
          このアプリについて
        </div>
      )}
      <div className='ml-auto mr-0 flex items-center'>
        {!isError && <div className='mx-2 text-xl'>{getNickName()}</div>}
        {!isError && (
          <Menu
            menuButton={
              <MenuButton>
                <div className='flex'>
                  <IconContext.Provider
                    value={{
                      size: '1.7em',
                      className: 'text-opacity-90 duration-300 hover:scale-105 hover:text-gray-300',
                    }}
                  >
                    <RiAccountCircleFill />
                  </IconContext.Provider>
                  <IconContext.Provider value={{ size: '0.6em', className: 'my-auto text-opacity-90' }}>
                    <AiFillCaretDown />
                  </IconContext.Provider>
                </div>
              </MenuButton>
            }
            offsetY={15}
          >
            {/* 'ゲスト利用時のプルダウン' */}
            {readUserResult?.user?.isGuest && (
              <>
                <MenuItem className='text-xl font-bold' onClick={handleClickFeedback}>
                  フィードバック
                </MenuItem>
                <MenuItem className='text-xl font-bold' onClick={handleRenderSignup}>
                  本登録
                </MenuItem>
                <MenuItem className='text-xl font-bold' onClick={handleClickLogout}>
                  ゲスト利用を終了
                </MenuItem>
              </>
            )}
            {/* 'ログイン利用時のプルダウン' */}
            {!readUserResult?.user?.isGuest && (
              <>
                <MenuItem className='text-xl font-bold' onClick={handleClickFeedback}>
                  フィードバック
                </MenuItem>
                <MenuItem className='text-xl font-bold' onClick={handleClickLogout}>
                  ログアウト
                </MenuItem>
              </>
            )}
          </Menu>
        )}
      </div>
    </div>
  );
};
