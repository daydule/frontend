import { InputWithIconComponent } from '../atoms/InputWithIconComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';
import React, { FormEvent, useState } from 'react';
import { AlertComponent } from '@/components/atoms/AlertComponent';
import { SignupForm, useSignupMutation } from '@/redux/auth/slice';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useReadUserQuery } from '@/redux/user/slice';
import { formValidation, validationResult } from '@/helpers/validationHelper';

export const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validation, setVaridation] = useState<validationResult>({ invalid: false });
  const [signup] = useSignupMutation();
  const router = useRouter();
  const { data: readUserResult, isError } = useReadUserQuery();

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();

    const data: SignupForm = {
      email,
      password,
      passwordConfirmation,
    };
    const validationResult = formValidation(data);

    if (!validationResult.invalid) {
      try {
        await signup(data).unwrap();
        if (isError || !readUserResult?.user.isGuest) {
          router.replace('/auth/login');
        } else {
          router.replace('/main');
        }
      } catch (e) {
        const signupErrorDisplay = document.getElementById('signup-error-display');
        const errorMessage = document.getElementById('signup-error-message');
        if (signupErrorDisplay && errorMessage) {
          signupErrorDisplay.classList.remove('hidden');
          // TODO: エラーメッセージは後で修正
          errorMessage.innerHTML = 'サインアップエラー';
        }
      }
    }

    setVaridation(validationResult);
  };

  return (
    <>
      <div className='border border-black'>
        <h2 className='text-center text-2xl my-6'>サインアップ</h2>
        <div
          id='signup-error-display'
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto xl:w-3/5 w-4/5 hidden'
          role='alert'
        >
          <span id='signup-error-message' className='block sm:inline'></span>
        </div>

        <form id='signup-form' onSubmit={handleSignup}>
          <div
            className={
              'mt-12 mx-auto xl:w-3/5 w-4/5' + (validation.email ? ' border-2 border-solid border-red-600' : '')
            }
          >
            <InputWithIconComponent<string>
              id='email'
              name='email'
              type='text'
              value={email}
              placeholder='メールアドレス'
              icon={<AiOutlineMail />}
              setter={setEmail}
            />
          </div>
          <div className='mx-auto xl:w-3/5 w-4/5'>{validation.email && <AlertComponent text={validation.email} />}</div>
          <div
            className={
              'mt-6 mx-auto xl:w-3/5 w-4/5' + (validation.password ? ' border-2 border-solid border-red-600' : '')
            }
          >
            <InputWithIconComponent<string>
              id='password'
              name='password'
              type='password'
              value={password}
              placeholder='パスワード'
              icon={<RiLock2Line />}
              setter={setPassword}
            />
          </div>
          <div className='mx-auto xl:w-3/5 w-4/5'>
            {validation.password && <AlertComponent text={validation.password} />}
          </div>
          <div className='mt-6 mx-auto xl:w-3/5 w-4/5'>
            <InputWithIconComponent<string>
              id='password-confirmation'
              name='password-confirmation'
              type='password'
              value={passwordConfirmation}
              placeholder='パスワード再入力'
              icon={<RiLock2Line />}
              setter={setPasswordConfirmation}
            />
          </div>
          <div className='mt-6 mb-4 text-center mx-auto xl:w-1/5 w-2/5'>
            <ButtonComponent type='submit' children='サインアップ' />
          </div>
        </form>
        {(isError || !readUserResult?.user.isGuest) && (
          <div>
            <p className='my-4 text-center text-sm'>
              ログインは
              <LinkComponent href='/auth/login' text='こちら' />
            </p>
          </div>
        )}
      </div>
    </>
  );
};
