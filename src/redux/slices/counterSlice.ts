import { CounterState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCount: (state) => {
      state.count = state.count + 1;
    },
    clearCounter: (state) => {
      state.count = 0;
    },
  },
});

export const { setCount, incrementCount, clearCounter } = counterSlice.actions;

export default counterSlice.reducer;
