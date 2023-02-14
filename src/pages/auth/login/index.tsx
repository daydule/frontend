import { NextPage } from 'next';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';

const LoginPage: NextPage = () => {
  return (
    <>
      <div className='container mt-28 mx-auto xl:w-2/5 w-full'>
        <LoginComponent />
        <div className='my-6 text-center mx-auto xl:w-2/5 w-3/5'>
          {/* TODO: ゲスト利用のAPIが完了次第修正 */}
          <ButtonComponent type='button' text='ゲストとして利用する' />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
