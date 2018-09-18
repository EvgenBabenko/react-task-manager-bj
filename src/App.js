import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import store from './store/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout />
    </BrowserRouter>
  </Provider>
);

export default App;
