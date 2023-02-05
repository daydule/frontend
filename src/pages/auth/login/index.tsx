import { NextPage } from 'next';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';

const LoginPage: NextPage = () => {
  return (
    <>
      <div className='container my-28 mx-auto'>
        <LoginComponent />
        <div className='my-6 text-center mx-64'>
          <ButtonComponent type='button' text='ゲストとして利用する　＞' />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
