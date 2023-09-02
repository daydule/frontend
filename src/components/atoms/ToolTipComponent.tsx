import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  content: string;
  children: React.ReactNode;
  extraClassName?: string;
}

export const TooltipComponent = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const baseClassName = 'absolute right-0 z-20 rounded-md bg-black bg-opacity-70 p-2 text-sm text-white text-center';
  return (
    <div className='relative inline-block'>
      <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {props.children}
      </div>
      {visible && <div className={twMerge(baseClassName, props.extraClassName)}>{props.content}</div>}
    </div>
  );
};
