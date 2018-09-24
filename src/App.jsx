import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from './components/Routes/Routes';
import Header from './components/Header/Header';
import store from './store/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
