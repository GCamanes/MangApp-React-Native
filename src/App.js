import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/common/AppContainer';
import AppRoutes from './app/app.routes';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <AppContainer>
      <AppRoutes />
    </AppContainer>
  </Provider>
);

export default App;
