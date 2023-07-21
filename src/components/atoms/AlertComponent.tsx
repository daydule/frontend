import React from 'react';

type Props = {
  text: string;
};

export const AlertComponent = (props: Props) => <p className='text-sm text-red-600 h-full'>{props.text}</p>;
