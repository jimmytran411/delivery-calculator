import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import makeStore from './rootRedux/store';
import { history } from './rootRedux/store';

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>Hello world</div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
