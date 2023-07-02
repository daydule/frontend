import { NextPage } from 'next';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { useGuestLoginMutation } from '@/redux/auth/slice';
import { useRouter } from 'next/router';
import { LoadingComponent } from '@/components/atoms/LoadingComponent';
import { useReadUserQuery } from '@/redux/user/slice';
import { errorHandler } from '@/helpers/errorHandlerHelper';

const LoginPage: NextPage = () => {
  const { isFetching, isError } = useReadUserQuery();
  const [guestLogin] = useGuestLoginMutation();
  const router = useRouter();

  const handleClickGuestLogin = async () => {
    try {
      await guestLogin()
        .unwrap()
        .then(() => router.replace('/main'))
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };
  if (!isFetching) {
    if (isError) {
      return (
        <div className='container mt-28 mx-auto xl:w-2/5 w-full'>
          <LoginComponent />
          <div className='mt-6 text-center mx-auto xl:w-2/5 w-3/5'>
            <ButtonComponent type='button' children='ゲストとして利用する' handleClick={handleClickGuestLogin} />
          </div>
        </div>
      );
    } else {
      router.replace('/main');
    }
  }
  return <LoadingComponent />;
};

export default LoginPage;
