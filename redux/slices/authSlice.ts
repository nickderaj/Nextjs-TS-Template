import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  user: string;
  authError: string;
}

const initialState: ISliceState = {
  user: '',
  authError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.authError = action.payload;
    },
  },
});

export const { setUser, setAuthError } = authSlice.actions;

export default authSlice.reducer;
