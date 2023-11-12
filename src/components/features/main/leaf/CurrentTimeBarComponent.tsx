import React, { useState, useEffect } from 'react';

type Props = {
  oneMinuteHeight: number;
};

const getNowPosition = (oneMinuteHeight: number) => {
  const now = new Date();
  return (now.getHours() * 60 + now.getMinutes()) * oneMinuteHeight;
};

export const CurrentTimeBarComponent = ({ oneMinuteHeight }: Props) => {
  const [nowTopPosition, setNowTopPosition] = useState(getNowPosition(oneMinuteHeight));

  // NOTE: 現在時刻バー表示更新のために、1分ごとに現在時刻を更新する
  useEffect(() => {
    const timerId = setInterval(() => {
      setNowTopPosition(getNowPosition(oneMinuteHeight));
    }, 60000);
    return () => clearInterval(timerId);
  }, [nowTopPosition, oneMinuteHeight]);

  return (
    <div
      className='absolute left-[8%] z-10 mt-4 h-0 w-11/12'
      style={{
        top: `calc(${nowTopPosition}px - 1.5px)`,
      }}
    >
      <div className='w-full border-t-4 border-red-500/70'></div>
      <div className='absolute -top-1.5 left-0 h-4 w-4 rounded-full border-8 border-red-500'></div>
    </div>
  );
};
