import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { AiFillSchedule } from 'react-icons/ai';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useGuestLoginMutation } from '@/redux/auth/slice';
import { useReadUserQuery } from '@/redux/user/slice';

const AboutPage: NextPage = () => {
  const { data: readUserResult, isError } = useReadUserQuery();
  const [guestLogin] = useGuestLoginMutation();
  const router = useRouter();

  const handleClickGuestLogin = async () => {
    try {
      await guestLogin()
        .unwrap()
        .then(() => router.replace('/main'))
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='mx-auto px-12 pb-36'>
      <section className='mb-48'>
        <div className='flex items-center justify-center'>
          <IconContext.Provider value={{ size: '10em', className: 'text-opacity-90' }}>
            <AiFillSchedule />
          </IconContext.Provider>
          <div className='my-56 font-mono text-9xl font-bold'>daydule</div>
        </div>
        <div className='text-center text-4xl font-bold'>あなたの1日を「効率的」に、そして「計画的」に。</div>
        <div className='mx-72'>
          <img
            src='aboutPageContents/dayduleMainImage.png'
            alt='dayduleのメインイメージ画像'
            className='my-12 rounded shadow-lg'
          />
        </div>
      </section>
      <hr />
      <section className='my-16'>
        <div className='my-40 text-center text-6xl'>ご利用の流れ</div>
        <div className='mx-52 mb-48 mt-24 grid grid-cols-2 gap-x-8 gap-y-56'>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <div className='text-4xl font-semibold'>1. 予定を登録</div>
              <div className='ml-8 text-2xl'>時刻を指定して予定を登録</div>
            </div>
          </div>
          <div>
            <img src='aboutPageContents/registerPlan.gif' alt='1. 予定を登録' className='rounded shadow-lg' />
          </div>
          <div>
            <img src='aboutPageContents/registerTodo.gif' alt='2. TODOを登録' className='rounded shadow-lg' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <div className='text-4xl font-semibold'>2. TODOを登録</div>
              <div className='ml-8 text-2xl'>所要時間を指定してTODOを登録</div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <div className='text-4xl font-semibold'>3. TODOの優先度を調整</div>
              <div className='ml-8 text-2xl'>優先したいTODOを上へ</div>
            </div>
          </div>
          <div>
            <img
              src='aboutPageContents/adjustTodoPriority.gif'
              alt='3. TODOの優先度を調整'
              className='rounded shadow-lg'
            />
          </div>
          <div>
            <img src='aboutPageContents/createSchedule.gif' alt='4. TODOを予定に変換' className='rounded shadow-lg' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <div className='text-4xl font-semibold'>4. TODOを予定に変換</div>
              <div className='ml-8 text-2xl'>ボタン一つでスケジュールを作成！</div>
            </div>
          </div>
        </div>
      </section>
      {isError && (
        <>
          <hr />
          <section className='my-36'>
            <div className='mx-auto flex flex-col items-center'>
              <ButtonComponent
                type='button'
                extraClassName='w-fit p-4 text-4xl my-8 shadow-2xl'
                handleClick={handleClickGuestLogin}
              >
                ゲストとして利用してみる
              </ButtonComponent>
              <ButtonComponent
                type='button'
                extraClassName='w-fit p-4 text-4xl mt-8 mb-16 shadow-2xl'
                handleClick={() => router.push('/auth/signup')}
              >
                サインアップする
              </ButtonComponent>
            </div>
            <div className='mx-auto flex items-center justify-center'>
              <div className='mr-4 text-xl'>既にアカウントをお持ちの場合は</div>
              <ButtonComponent
                type='button'
                extraClassName='w-fit p-2 text-2xl bg-indigo-300 hover:bg-indigo-200'
                handleClick={() => router.push('/auth/login')}
              >
                ここからログイン
              </ButtonComponent>
            </div>
          </section>
        </>
      )}
      <hr />
      <section className='mx-auto my-48 w-1/2'>
        <div className='mb-4 text-3xl font-bold'>dayduleへのフィードバック</div>
        <div className='mb-6 text-xl'>「フィードバック」ボタンから皆様のご意見をお聞かせください。</div>
        <img src='aboutPageContents/sendFeedback.gif' alt='TODOを予定に変換のgif' className='rounded shadow-sm' />
        <div className='mb-4 mt-24 text-3xl font-bold'>今後のアップデート予定</div>
        <ul className='list-disc pl-5'>
          <li className='text-xl'>既存機能のブラッシュアップ</li>
          <li className='text-xl'>ユーザー情報のアップデート機能</li>
          <li className='text-xl'>（ログインユーザー限定）繰り返しの予定登録機能</li>
        </ul>
        <div className='my-6 text-2xl'>フィードバックをもとに、さらにパワーアップ予定！</div>
        <div className='mb-4 mt-24 text-3xl font-bold text-red-700'>注意</div>
        <ul className='list-disc pl-5'>
          <li className='text-xl'>本サービスはベータ版です。</li>
          <li className='text-xl'>予告なくサービスを終了する可能性がございます。</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
