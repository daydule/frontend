import React from 'react';

type Props = {
  text: string;
};

export const AlertComponent = (props: Props) => <p className='h-full text-sm text-red-600'>{props.text}</p>;
