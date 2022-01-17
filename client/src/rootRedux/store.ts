import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./rootReducer";

export const history = createBrowserHistory();

type RootReducer = {
  default?: [];
  router?: any;
};

const initialState: RootReducer = {};

export default function makeStore() {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      });
    }
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), ...middlewares))
  );

  return store;
}
