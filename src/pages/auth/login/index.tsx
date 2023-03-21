import { NextPage } from 'next';
import { LoginComponent } from '@/components/organisms/LoginComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { RedirectToMainIfLoginComponent } from '@/components/utils/RedirectToMainIfLoginComponent';

const LoginPage: NextPage = () => {
  return (
    <RedirectToMainIfLoginComponent>
      <div className='container mt-28 mx-auto xl:w-2/5 w-full'>
        <LoginComponent />
        <div className='mt-6 text-center mx-auto xl:w-2/5 w-3/5'>
          {/* TODO: ゲスト利用のAPIが完了次第修正 */}
          <ButtonComponent type='button' children='ゲストとして利用する' onClick={() => {}} />
        </div>
      </div>
    </RedirectToMainIfLoginComponent>
  );
};

export default LoginPage;
