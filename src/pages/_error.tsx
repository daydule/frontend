import { NextPage, NextPageContext } from 'next';
import React from 'react';

interface Props {
  statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  if (statusCode === 404) return <div>{statusCode}Not Found</div>;

  return <div>{statusCode}エラーが発生しました</div>;
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;
