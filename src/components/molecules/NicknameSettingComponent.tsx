import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { useReadUserQuery, useUpdateUserMutation } from '@/redux/user/slice';
import { errorHandler } from '@/helpers/errorHandlerHelper';

export const NicknameSettingComponent = () => {
  const [nickname, setNickname] = useState<string>('');

  const [userUpdate] = useUpdateUserMutation();
  const { data: readUserResult, isError } = useReadUserQuery();

  const handleClickUpdateNickname = async () => {
    // TODO: ニックネーム更新用のAPIを作成したら、直書きを修正
    const data = {
      nickname: nickname,
      email: 'test306691@example.com',
      password: 'DDpw7777',
    };
    try {
      const result = await userUpdate(data).unwrap().catch(errorHandler);
      const nicknameInput = document.getElementById('nickname');
      if (result && nicknameInput) {
        nicknameInput.setAttribute('placeholder', result.user.nickname);
      }
      setNickname('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
            <ButtonComponent type='button' children='ニックネーム変更' handleClick={handleClickUpdateNickname} />
          </div>
        </div>
      </form>
    </div>
  );
};
