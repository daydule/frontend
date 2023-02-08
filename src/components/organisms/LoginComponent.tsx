import { InputComponent } from '../atoms/InputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import { useLoginMutation } from '@/redux/auth/slice';

export const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, isSuccess, status }] = useLoginMutation();

  const onClickLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      await login(data).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='border border-black h-96'>
        <h2 className='text-center text-2xl my-6'>ログイン</h2>
        <div className='mt-12 mx-32'>
          <InputComponent
            id='email'
            name='email'
            type='text'
            value={email}
            placeholder='メールアドレス'
            iconType='AiOutlineMail'
            setter={setEmail}
          />
        </div>
        <div className='mt-6 mx-32'>
          <InputComponent
            id='password'
            name='password'
            type='text'
            value={password}
            placeholder='パスワード'
            iconType='RiLock2Line'
            setter={setPassword}
          />
        </div>
        <div className='mt-6 text-center mx-72'>
          <ButtonComponent type='button' text='ログイン' onClick={onClickLogin} />
        </div>
        <div>
          <p className='mt-4 text-center text-sm'>サインアップはこちら</p>
          <p className='mt-2 text-center text-sm'>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </>
  );
};
