import { InputComponent } from '../atoms/InputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';

export const LoginComponent: React.FC = () => {
  return (
    <>
      <div className='border border-black h-96'>
        <h2 className='text-center text-2xl my-6'>ログイン</h2>
        <div className='mt-12 mx-32'>
          <InputComponent type='text' placeholder='メールアドレス' iconType='AiOutlineMail' />
        </div>
        <div className='mt-6 mx-32'>
          <InputComponent type='password' placeholder='パスワード' iconType='RiLock2Line' />
        </div>
        <div className='mt-6 text-center mx-72'>
          <ButtonComponent type='button' text='ログイン' />
        </div>
        <div>
          <p className='mt-4 text-center text-sm'>サインアップはこちら</p>
          <p className='mt-2 text-center text-sm'>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </>
  );
};
