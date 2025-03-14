// redux/store.js
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice'
import userReducer  from './userSlice';

import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  weather: weatherReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;