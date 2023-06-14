import { InputWithIconComponent } from '../atoms/InputWithIconComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';
import React, { useState } from 'react';
import { useLoginMutation } from '@/redux/auth/slice';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';

export const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleClickLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      await login(data).unwrap();
      router.replace('/main');
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

        <form id='login-form'>
          <div className='mt-12 mx-auto xl:w-3/5 w-4/5'>
            <InputWithIconComponent<string>
              id='email'
              name='email'
              type='text'
              value={email}
              placeholder='メールアドレス'
              icon={<AiOutlineMail />}
              setter={setEmail}
              handleClickLogin={handleClickLogin}
            />
          </div>
          <div className='mt-6 mx-auto xl:w-3/5 w-4/5'>
            <InputWithIconComponent<string>
              id='password'
              name='password'
              type='password'
              value={password}
              placeholder='パスワード'
              icon={<RiLock2Line />}
              setter={setPassword}
              handleClickLogin={handleClickLogin}
            />
          </div>
          <div className='mt-6 text-center mx-auto xl:w-1/5 w-2/5'>
            <ButtonComponent type='button' children='ログイン' handleClick={handleClickLogin} />
          </div>
        </form>
        <div>
          <p className='mt-4 text-center text-sm'>
            サインアップは
            <LinkComponent href='/auth/signup' text='こちら' />
          </p>
          <p className='mt-2 mb-4 text-center text-sm'>
            パスワードを忘れた方は
            <LinkComponent href='/auth/resetPassword/sendResetPasswordMail' text='こちら' />
          </p>
        </div>
      </div>
    </>
  );
};
