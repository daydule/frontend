import '@/styles/global.css';

import React from 'react';
import type { AppProps } from 'next/app';
import LayoutComponent from '@/components/templates/LayoutComponent';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
