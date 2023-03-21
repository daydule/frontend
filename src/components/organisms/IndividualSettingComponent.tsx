import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { useReadQuery } from '@/redux/user/slice';
import { useUpdateUserMutation } from '@/redux/user/slice';

export const IndividualSettingComponent = () => {
  const [nickname, setNickname] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');

  const [userUpdate] = useUpdateUserMutation();
  const { data: readUserResult, isError } = useReadQuery();

  const onClickUpdateNickname = async () => {
    const data = {
      nickname: nickname,
      email: 'test306691@example.com',
      password: 'daydule-password',
    };
    try {
      const result = await userUpdate(data).unwrap();
      const nicknameInput = document.getElementById('nickname');
      if (nicknameInput) {
        nicknameInput.setAttribute('placeholder', result.user.nickname);
      }
      setNickname('');
    } catch (e) {
      console.log(e);
      const updateUserErrorDisplay = document.getElementById('update-user-error-display');
      const errorMessage = document.getElementById('update-user-error-message');
      if (updateUserErrorDisplay && errorMessage) {
        updateUserErrorDisplay.classList.remove('hidden');
        // TODO: エラーメッセージは後で修正
        errorMessage.innerHTML = 'ニックネーム更新エラー';
      }
    }
  };

  return (
    <>
      <div className='border border-black h-[calc(100%-5rem)]'>
        <div className='h-20'>
          <h1 className='mt-4 ml-4 text-3xl'>個別設定</h1>
        </div>

        <div
          id='update-user-error-display'
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto xl:w-3/5 w-4/5 hidden'
          role='alert'
        >
          <span id='update-user-error-message' className='block sm:inline'></span>
        </div>
        <Tabs>
          <TabList>
            <Tab>定期予定</Tab>
            <Tab>ニックネーム変更</Tab>
            <Tab>パスワード変更</Tab>
          </TabList>

          <TabPanel>
            <div></div>
          </TabPanel>
          <TabPanel>
            <div className='mt-20'>
              <form id='register-todo-form'>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-28'>ニックネーム</label>
                  <div className=' border-b border-black w-64'>
                    <SimpleInputComponent<string>
                      id='userName'
                      name='userName'
                      type='text'
                      placeholder={readUserResult?.user.nickname ? readUserResult.user.nickname : 'ニックネーム未登録'}
                      value={nickname}
                      setter={setNickname}
                      extraClassName='border-none outline-none'
                    />
                  </div>
                </div>
                <div className='flex ml-20 mt-20'>
                  <div className='mr-6'>
                    <ButtonComponent type='button' children='ニックネーム変更' onClick={onClickUpdateNickname} />
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='mt-20'>
              <form id='register-todo-form'>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-32'>今のパスワード</label>
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
                  <label className='mr-8 block float-left w-32'>新しいパスワード</label>
                  <div className=' border-b border-black w-64'>
                    <SimpleInputComponent<string>
                      id='newPassword'
                      name='newPassword'
                      type='text'
                      value={newPassword}
                      setter={setNewPassword}
                      extraClassName='border-none outline-none'
                    />
                  </div>
                </div>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-32'>新しいパスワード（確認用）</label>
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
                    <ButtonComponent type='button' children='パスワード変更' onClick={() => {}} />
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
