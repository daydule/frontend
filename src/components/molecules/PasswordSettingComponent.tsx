import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useUpdatePasswordMutation } from '@/redux/user/slice';

export const PasswordSettingComponent = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');

  const [updatePassword] = useUpdatePasswordMutation();

  const handleClickUpdatePassword = async () => {
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      await updatePassword(data)
        .unwrap()
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setNewPasswordConfirmation('');
        })
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='mt-20'>
      <form id='register-todo-form'>
        <div className='ml-20 mt-10 flex'>
          <label className='float-left mr-8 block w-64'>今のパスワード</label>
          <div className=' w-64 border-b border-black'>
            <SimpleInputComponent
              id='currentPassword'
              name='currentPassword'
              type='password'
              value={currentPassword}
              setter={setCurrentPassword}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='ml-20 mt-10 flex'>
          <label className='float-left mr-8 block w-64'>新しいパスワード</label>
          <div className=' w-64 border-b border-black'>
            <SimpleInputComponent
              id='newPassword'
              name='newPassword'
              type='password'
              value={newPassword}
              setter={setNewPassword}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='ml-20 mt-10 flex'>
          <label className='float-left mr-8 block w-64'>新しいパスワード（確認用）</label>
          <div className=' w-64 border-b border-black'>
            <SimpleInputComponent
              id='newPasswordConfirmation'
              name='newPasswordConfirmation'
              type='password'
              value={newPasswordConfirmation}
              setter={setNewPasswordConfirmation}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='ml-20 mt-20 flex'>
          <div className='mr-6'>
            <ButtonComponent type='button' children='パスワード変更' handleClick={handleClickUpdatePassword} />
          </div>
        </div>
      </form>
    </div>
  );
};
