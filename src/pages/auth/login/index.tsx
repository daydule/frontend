import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { LoadingComponent } from '@/components/atoms/LoadingComponent';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useGuestLoginMutation } from '@/redux/auth/slice';
import { useReadUserQuery } from '@/redux/user/slice';

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
        <div className='container mx-auto mt-28 w-full xl:w-2/5'>
          <LoginComponent />
          <div className='mx-auto mt-6 w-3/5 text-center xl:w-2/5'>
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
