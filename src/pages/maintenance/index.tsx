import { NextPage } from 'next';

const MaintenancePage: NextPage = () => {
  return (
    <div className='mt-24 h-full text-center'>
      <h1 className='text-3xl'>ただいまメンテナンス中です</h1>
      <p className='mt-12'>ご不便をおかけし申し訳ございません</p>
      <p className='mt-4'>メンテナンス作業が完了するまで今しばらくお待ちください</p>
    </div>
  );
};

export default MaintenancePage;
