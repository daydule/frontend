import Link from 'next/link';
import { ReactNode } from 'react';
type Props = {
  href: string;
  text?: string;
  extraClassName?: string;
};

export const LinkComponent = (props: Props) => (
  <Link
    className={
      props.extraClassName + ' ' + 'text-blue-600 transition duration-100 hover:text-indigo-500 active:text-indigo-600 '
    }
    href={props.href}
  >
    {props.text}
  </Link>
);
