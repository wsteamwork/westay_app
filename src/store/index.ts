/* eslint-disable linebreak-style */
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import reducers from './redux/reducers';

const enhancers = [applyMiddleware(thunkMiddleware)];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['rooms', 'roomHome', 'cityDistrict', 'searchField'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);
