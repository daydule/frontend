import '@/styles/global.css';

import React from 'react';
import type { AppProps } from 'next/app';
import LayoutComponent from '@/components/utils/LayoutComponent';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

if (process.env.NODE_ENV === 'development') {
  const MockServer = () => import('@/mocks/worker');
  MockServer();
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </Provider>
  );
}

export default App;
