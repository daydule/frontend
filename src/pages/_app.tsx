import '@/styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import LayoutComponent from '@/components/common/forest/LayoutComponent';
import { store } from '@/redux/store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </Provider>
  );
}

export default App;
