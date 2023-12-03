import React from 'react';

export const CurrentTimeBarComponent = () => {
  return (
    <div className='h-0 w-full will-change-auto'>
      <div className='w-full border-t-4 border-red-500/70'></div>
      <div className='absolute -top-1.5 left-0 h-4 w-4 rounded-full border-8 border-red-500'></div>
    </div>
  );
};
