import { useRouter } from 'next/router';
import React, { FormEvent, useState, useRef } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { InputWithIconComponent } from '../../../../common/leaf/InputWithIconComponent';
import { LinkComponent } from '../../../../common/leaf/LinkComponent';
import { AlertComponent } from '@/components/common/leaf/AlertComponent';
import { ButtonComponent } from '@/components/common/tree/ButtonComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { formValidation, ValidationResult } from '@/helpers/validationHelper';
import { useLoginMutation } from '@/redux/auth/slice';

export const LoginComponent = () => {
  const [validation, setValidation] = useState<ValidationResult>({ invalid: false });
  const [login] = useLoginMutation();
  const router = useRouter();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();

    const data = {
      email: inputEmailRef.current?.value ?? '',
      password: inputPasswordRef.current?.value ?? '',
    };

    const validationResult = formValidation(data);

    if (!validationResult.invalid) {
      try {
        await login(data)
          .unwrap()
          .then(() => {
            router.replace('/main');
          })
          .catch(errorHandler);
      } catch (e) {
        console.error(e);
      }
    }

    setValidation(validationResult);
  };

  return (
    <>
      <div className='border border-black'>
        <h2 className='my-6 text-center text-2xl'>ログイン</h2>
        <div
          id='login-error-display'
          className='relative mx-auto hidden w-4/5 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 xl:w-3/5'
          role='alert'
        >
          <span id='login-error-message' className='block sm:inline'></span>
        </div>

        <form id='login-form' onSubmit={handleLogin}>
          <div
            className={
              'mt-12 mx-auto xl:w-3/5 w-4/5' + (validation.email ? ' border-2 border-solid border-red-600' : '')
            }
          >
            <InputWithIconComponent
              id='email'
              name='email'
              type='text'
              placeholder='メールアドレス'
              icon={<AiOutlineMail />}
              customRef={inputEmailRef}
            />
          </div>
          <div className={'mx-auto xl:w-3/5 w-4/5' + (validation.email ? ' h-6' : '')}>
            {validation.email && <AlertComponent text={validation.email} />}
          </div>
          <div
            className={
              'mx-auto xl:w-3/5 w-4/5' +
              (validation.password ? ' border-2 border-solid border-red-600' : '') +
              (validation.email ? '' : ' mt-6')
            }
          >
            <InputWithIconComponent
              id='password'
              name='password'
              type='password'
              placeholder='パスワード'
              icon={<RiLock2Line />}
              customRef={inputPasswordRef}
            />
          </div>
          <div className={'mx-auto xl:w-3/5 w-4/5 ' + (validation.password ? ' h-6' : '')}>
            {validation.password && <AlertComponent text={validation.password} />}
          </div>
          <div className={'text-center mx-auto xl:w-1/5 w-2/5 ' + (validation.password ? '' : ' mt-6')}>
            <ButtonComponent type='submit' children='ログイン' />
          </div>
        </form>
        <div>
          <p className='mt-4 text-center text-sm'>
            サインアップは
            <LinkComponent href='/auth/signup' text='こちら' />
          </p>
          {/* <p className='mt-2 mb-4 text-center text-sm'>
            パスワードを忘れた方は
            <LinkComponent href='/auth/resetPassword/sendResetPasswordMail' text='こちら' />
          </p> */}
        </div>
      </div>
    </>
  );
};
