import { MouseEventHandler } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  extraClassName?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonComponent: React.FC<Props> = (props) => (
  <div className='relative'>
    <button
      className={
        props.extraClassName + ' ' + 'rounded-lg w-full bg-indigo-700 py-2 px-4 font-bold text-white hover:bg-blue-700'
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  </div>
);
