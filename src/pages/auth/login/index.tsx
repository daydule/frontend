import { NextPage } from 'next';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { RedirectToMainIfLoginComponent } from '@/components/utils/RedirectToMainIfLoginComponent';
import { useGuestLoginMutation } from '@/redux/auth/slice';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const [guestLogin] = useGuestLoginMutation();
  const router = useRouter();

  const handleClickGuestLogin = async () => {
    try {
      await guestLogin().unwrap();
      router.replace('/main');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <RedirectToMainIfLoginComponent>
      <div className='container mt-28 mx-auto xl:w-2/5 w-full'>
        <LoginComponent />
        <div className='mt-6 text-center mx-auto xl:w-2/5 w-3/5'>
          <ButtonComponent type='button' children='ゲストとして利用する' handleClick={handleClickGuestLogin} />
        </div>
      </div>
    </RedirectToMainIfLoginComponent>
  );
};

export default LoginPage;
