import { InputComponent } from '../atoms/InputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import { useLoginMutation } from '@/redux/auth/slice';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';

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
      window.location.href = '/';
    } catch (e) {
      const loginErrorDisplay = document.getElementById('login-error-display');
      const errorMessage = document.getElementById('login-error-message');
      if (loginErrorDisplay && errorMessage) {
        loginErrorDisplay.classList.remove('hidden');
        // TODO: エラーメッセージは後で修正
        errorMessage.innerHTML = 'ログインエラー';
      }
    }
  };

  return (
    <>
      <div className='border border-black'>
        <h2 className='text-center text-2xl my-6'>ログイン</h2>
        <div
          id='login-error-display'
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto xl:w-3/5 w-4/5 hidden'
          role='alert'
        >
          <span id='login-error-message' className='block sm:inline'></span>
        </div>
        <div className='mt-12 mx-auto xl:w-3/5 w-4/5'>
          <InputComponent
            id='email'
            name='email'
            type='text'
            value={email}
            placeholder='メールアドレス'
            icon={<AiOutlineMail />}
            setter={setEmail}
          />
        </div>
        <div className='mt-6 mx-auto xl:w-3/5 w-4/5'>
          <InputComponent
            id='password'
            name='password'
            type='password'
            value={password}
            placeholder='パスワード'
            icon={<RiLock2Line />}
            setter={setPassword}
          />
        </div>
        <div className='mt-6 text-center mx-auto xl:w-1/5 w-2/5'>
          <ButtonComponent type='button' text='ログイン' onClick={onClickLogin} />
        </div>
        <div>
          <p className='mt-4 text-center text-sm'>サインアップはこちら</p>
          <p className='mt-2 mb-4 text-center text-sm'>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </>
  );
};
