import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: combinedReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof combinedReducer>;

export const store = configureStore({
  reducer: combinedReducer,
});

export type ReduxState = ReturnType<typeof store.getState>;
