import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user_reducer from './auth/auth.reducer';
import channel_reducer from './channel/channel.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default persistReducer(persistConfig, rootReducer);
