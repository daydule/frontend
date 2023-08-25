import React from 'react';

export const LoadingComponent = () => (
  <div className='fixed inset-0 flex items-center justify-center'>
    <div className='h-24 w-24 animate-spin rounded-full border-r-4 border-t-4 border-indigo-700'></div>
    <div className='ml-4 animate-pulse text-xl font-bold text-indigo-700'>Loading...</div>
  </div>
);
