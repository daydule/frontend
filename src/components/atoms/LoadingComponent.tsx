import React from 'react';

export const LoadingComponent = () => (
  <div className='fixed inset-0 flex items-center justify-center'>
    <div className='h-32 w-32 animate-spin rounded-full border-x-[15px] border-indigo-700'></div>
    <div className='ml-4 text-2xl'>Loading...</div>
  </div>
);
