import Link from 'next/link';
import { ReactNode } from 'react';
type Props = {
  href: string;
  children?: ReactNode;
  extraClassName?: string;
};

export const LinkComponent: React.FC<Props> = (props) => (
  <Link
    className={
      'text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600 ' + props.extraClassName
    }
    href={props.href}
  >
    {props?.children ? <div>{props.children}</div> : null}
  </Link>
);
