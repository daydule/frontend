import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { useUpdatePasswordMutation } from '@/redux/user/slice';

export const PasswordSettingComponent = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');

  const [updatePassword] = useUpdatePasswordMutation();

  const onClickUpdatePassword = async () => {
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      await updatePassword(data).unwrap();

      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirmation('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='mt-20'>
      <form id='register-todo-form'>
        <div className='mt-10 ml-20 flex'>
          <label className='mr-8 block float-left w-64'>今のパスワード</label>
          <div className=' border-b border-black w-64'>
            <SimpleInputComponent<string>
              id='currentPassword'
              name='currentPassword'
              type='password'
              value={currentPassword}
              setter={setCurrentPassword}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='mt-10 ml-20 flex'>
          <label className='mr-8 block float-left w-64'>新しいパスワード</label>
          <div className=' border-b border-black w-64'>
            <SimpleInputComponent<string>
              id='newPassword'
              name='newPassword'
              type='password'
              value={newPassword}
              setter={setNewPassword}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='mt-10 ml-20 flex'>
          <label className='mr-8 block float-left w-64'>新しいパスワード（確認用）</label>
          <div className=' border-b border-black w-64'>
            <SimpleInputComponent<string>
              id='newPasswordConfirmation'
              name='newPasswordConfirmation'
              type='password'
              value={newPasswordConfirmation}
              setter={setNewPasswordConfirmation}
              extraClassName='border-none outline-none'
            />
          </div>
        </div>
        <div className='flex ml-20 mt-20'>
          <div className='mr-6'>
            <ButtonComponent type='button' children='パスワード変更' onClick={onClickUpdatePassword} />
          </div>
        </div>
      </form>
    </div>
  );
};
