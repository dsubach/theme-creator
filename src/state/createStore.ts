import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import themeReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { IThemeEditor } from './types';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeId', 'themeOptions', 'themeObject', 'savedThemes', 'editor'],
};

// in production, persist the mobileWarningSeen value so mobile users don't see the popup again on reload
if (process.env.NODE_ENV === 'production') {
  persistConfig.whitelist.push('mobileWarningSeen');
}

const persistedReducer = persistReducer<IThemeEditor>(persistConfig, themeReducer);

// const store = reduxCreateStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
