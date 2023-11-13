import React, { useState, useEffect } from 'react';
import { getNowPosition } from '@/helpers/scheduleHelper';

type Props = {
  oneMinuteHeight: number;
};

export const CurrentTimeBarComponent = ({ oneMinuteHeight }: Props) => {
  const [nowTopPosition, setNowTopPosition] = useState(getNowPosition(oneMinuteHeight));

  useEffect(() => {
    // NOTE: oneMinuteHeight変更時に現在時刻バーの位置を更新する
    setNowTopPosition(getNowPosition(oneMinuteHeight));
    // NOTE: 1分間隔で現在時刻バーの位置を更新する
    const timerId = setInterval(() => {
      setNowTopPosition(getNowPosition(oneMinuteHeight));
    }, 60000);
    return () => clearInterval(timerId);
  }, [oneMinuteHeight]);

  return (
    <div
      className='absolute left-[8%] z-10 mt-4 h-0 w-11/12 will-change-auto'
      style={{
        top: `calc(${nowTopPosition}px - 1.5px)`,
      }}
    >
      <div className='w-full border-t-4 border-red-500/70'></div>
      <div className='absolute -top-1.5 left-0 h-4 w-4 rounded-full border-8 border-red-500'></div>
    </div>
  );
};
