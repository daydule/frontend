import { InputComponent } from '../atoms/InputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import { useLoginMutation } from '@/redux/auth/slice';

export const LoginComponent: React.FC = () => {
  const [userName, setUserName] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // result, error, isUninitialized, isLoading, isSuccess, isError
  const [login, { isLoading, isError, isSuccess, status }] = useLoginMutation();

  const onClickLogin = async () => {
    const data = {
      userName: 'john',
      password: 'pass1234',
    };
    try {
      await login(data).unwrap();
      document.location = 'http://localhost:3001/';
    } catch (e) {
      console.error(e);
      document.location = 'http://localhost:3001/auth/login/error';
    }
  };

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
