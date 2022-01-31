import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';

import makeStore from './rootRedux/store';
import { history } from './rootRedux/store';
import { Calculator } from './views/Calculator';
import { CalendarProvider } from './views/Calculator/context/CalendarContext';

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#b7b7b717',
    minHeight: '100vh',
  },
}));

const App: React.FC = () => {
  const { root } = useAppStyles();
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={root}>
          <CalendarProvider>
            <Calculator />
          </CalendarProvider>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
