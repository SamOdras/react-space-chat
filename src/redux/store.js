import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";
import reduxThunk from "redux-thunk";

const middlewares = [reduxThunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { store, persistStore };
