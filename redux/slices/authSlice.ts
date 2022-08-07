import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  token: string;
  user: string;
  authError: string;
}

const initialState: ISliceState = {
  token: '',
  user: '',
  authError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.authError = action.payload;
    },
  },
});

export const { setToken, setUser, setAuthError } = authSlice.actions;

export default authSlice.reducer;
