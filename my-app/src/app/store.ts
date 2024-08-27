import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/productSlicer'; // adjust the path if necessary


export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
