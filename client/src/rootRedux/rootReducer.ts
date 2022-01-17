import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const rootReducer = (history: any) => {
  return combineReducers({ router: connectRouter(history) });
};

export type Store = ReturnType<typeof rootReducer>;
export default rootReducer;
