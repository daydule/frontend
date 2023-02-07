import { ButtonComponent } from '@/components/utils/ButtonComponent';
import { useLoginMutation } from '@/redux/auth/slice';
import { NextPage } from 'next';
import { useState } from 'react';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, isSuccess, status }] = useLoginMutation();

  const inputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const inputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      await login(data).unwrap();
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div>This is login page.</div>
      <input type='text' name='email' placeholder='email' value={email} onChange={inputEmailHandler} />
      <input type='text' name='password' placeholder='password' value={password} onChange={inputPasswordHandler} />
      <ButtonComponent type='button' onClick={onClickLogin}>
        Login
      </ButtonComponent>
    </>
  );
};

export default LoginPage;
