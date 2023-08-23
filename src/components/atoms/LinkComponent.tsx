import Link from 'next/link';
import { ReactNode } from 'react';
type Props = {
  href: string;
  text?: string;
};

export const LinkComponent = (props: Props) => (
  <Link
    className={'text-blue-600 transition duration-100 hover:text-indigo-500 active:text-indigo-600'}
    href={props.href}
  >
    {props.text}
  </Link>
);
