import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useReadUserQuery, useUpdateUserMutation } from '@/redux/user/slice';

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
        <div className='ml-20 mt-10 flex'>
          <label className='float-left mr-8 block w-28'>ニックネーム</label>
          <div className=' w-64 border-b border-black'>
            <SimpleInputComponent
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
        <div className='ml-20 mt-20 flex'>
          <div className='mr-6'>
            <ButtonComponent type='button' children='ニックネーム変更' handleClick={handleClickUpdateNickname} />
          </div>
        </div>
      </form>
    </div>
  );
};
