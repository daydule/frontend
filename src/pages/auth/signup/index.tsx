import { ButtonComponent } from '@/components/utils/ButtonComponent';
import { useGuestCheckQuery, useSignupMutation } from '@/redux/auth/slice';
import { NextPage } from 'next';
import { useState } from 'react';

const SignupPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading, isError, isSuccess, status }] = useSignupMutation();

  const inputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const inputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickSignup = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      await signup(data).unwrap();
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div>This is Signup page.</div>
      <input type='text' name='email' placeholder='email' value={email} onChange={inputEmailHandler} />
      <input type='text' name='password' placeholder='password' value={password} onChange={inputPasswordHandler} />
      <ButtonComponent type='button' onClick={onClickSignup}>
        Signup
      </ButtonComponent>
    </>
  );
};

export default SignupPage;
