import React from 'react';
import { makeStyles } from '@material-ui/core';

import { Calculator } from './views/Calculator';

const useAppStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#b7b7b717',
    minHeight: '100vh',
  },
}));

const App: React.FC = () => {
  const { root } = useAppStyles();
  return (
    <div className={root}>
      <Calculator />
    </div>
  );
};

export default App;
