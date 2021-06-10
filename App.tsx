import React from 'react';
import {Provider} from 'react-redux';

import {store} from './src/config/store/store';
import Home from './src/pages/HomeScreen/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
