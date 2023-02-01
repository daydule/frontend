import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { guestCheck } from '@/services/authServices';

type guestCheckResult = {
  isError: boolean;
  isLogin: boolean;
  isGuest: boolean;
};

const Index: NextPage = () => {
  const [guestCheckResult, setGuestCheckResult] = useState<guestCheckResult>();

  // api呼び出しサンプル
  useEffect(() => {
    const setState = async () => {
      setGuestCheckResult(await guestCheck());
    };
    setState().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className='text-3xl font-bold underline'>This is about page.</div>
      <p>{guestCheckResult?.isError ? 'エラー' : 'エラーじゃない！'}</p>
      <p>{guestCheckResult?.isLogin ? 'ログイン済み' : '未ログイン'}</p>
      <p>{guestCheckResult?.isGuest ? 'ゲスト' : 'ゲストじゃない！'}</p>
    </>
  );
};

export default Index;
