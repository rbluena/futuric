import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import { createWrapper } from 'next-redux-wrapper';
import initializeStore from '@app/store';
import '../styles/globals.css';

const store = initializeStore();

const persistor = persistStore(store);
// const wrapper = createWrapper(initializeStore, { debug: true });

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.shape).isRequired,
};

// export default wrapper.withRedux(MyApp);
export default MyApp;
