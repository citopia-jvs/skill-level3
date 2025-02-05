import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import createSagaMiddleware from 'redux-saga';
import watchFetchData from './saga';
import dataSlice from './slices/dataSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userSlice,
  dummyData: dataSlice,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchData);

export const persistor: Persistor = persistStore(store);
// persistor.purge();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
