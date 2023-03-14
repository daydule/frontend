import { InputWithIconComponent } from '../atoms/InputWithIconComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { LinkComponent } from '../atoms/LinkComponent';
import React, { useState } from 'react';
import { useLoginMutation } from '@/redux/auth/slice';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLock2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { ScheduleComponent } from '@/components/organisms/ScheduleComponent';

export const IndividualSettingComponent = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <div className='border border-black h-[calc(100%-5rem)]'>
        <div className='h-20'>
          <h1 className='mt-4 ml-4 text-3xl'>個別設定</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab>定期予定</Tab>
            <Tab>プロフィール</Tab>
          </TabList>

          <TabPanel>
            <div></div>
          </TabPanel>
          <TabPanel>
            <div className='mt-20'>
              <form id='register-todo-form'>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-28'>ユーザー名</label>
                  <div className=' border-b border-black w-64'>
                    <SimpleInputComponent<string>
                      id='userName'
                      name='userName'
                      type='text'
                      value={userName}
                      setter={setUserName}
                      extraClassName='border-none outline-none'
                    />
                  </div>
                </div>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-28'>メールアドレス</label>
                  <div className=' border-b border-black w-64'>
                    <SimpleInputComponent<string>
                      id='email'
                      name='email'
                      type='text'
                      value={email}
                      setter={setEmail}
                      extraClassName='border-none outline-none'
                    />
                  </div>
                </div>
                <div className='mt-10 ml-20 flex'>
                  <label className='mr-8 block float-left w-28'>パスワード</label>
                  <div className=' border-b border-black w-64'>
                    <SimpleInputComponent<string>
                      id='password'
                      name='password'
                      type='password'
                      value={password}
                      setter={setPassword}
                      extraClassName='border-none outline-none'
                    />
                  </div>
                </div>
                <div className='flex ml-20 mt-20'>
                  <div className='mr-6'>
                    <ButtonComponent type='button' children='ユーザー情報変更' onClick={() => {}} />
                  </div>
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
