import '@/styles/global.css';

import React from 'react';
import type { AppProps } from 'next/app';
import LayoutComponent from '@/components/templates/LayoutComponent';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>daydule</title>
        <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
        <ReduxToastr
          timeOut={10000}
          newestOnTop={false}
          preventDuplicates
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          progressBar
          closeOnToastrClick
        />
      </LayoutComponent>
    </Provider>
  );
}

export default App;
