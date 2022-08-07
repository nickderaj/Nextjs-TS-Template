import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  user: string;
  authError: string;
  authLoading: boolean;
}

const initialState: ISliceState = {
  user: '',
  authError: '',
  authLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      state.authLoading = false;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.authError = action.payload;
    },
  },
});

export const { setUser, setAuthError } = authSlice.actions;

export default authSlice.reducer;
