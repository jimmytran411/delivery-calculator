import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import makeStore from './rootRedux/store';
import { history } from './rootRedux/store';
import { Calculator } from './views/Calculator';

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Calculator />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
