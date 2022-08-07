import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  authModalOpen: boolean;
  authModalState: 'login' | 'logout' | 'signup';
}

const initialState: ISliceState = {
  authModalOpen: false,
  authModalState: 'login',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.authModalOpen = action.payload;
    },
    setLoginModalOpen: (state) => {
      state.authModalOpen = true;
      state.authModalState = 'login';
    },
    setLogoutModalOpen: (state) => {
      state.authModalOpen = true;
      state.authModalState = 'logout';
    },
    setSignupModalOpen: (state) => {
      state.authModalOpen = true;
      state.authModalState = 'signup';
    },
    closeAllModals: (state) => {
      state.authModalOpen = false;
    },
  },
});

export const { setAuthModalOpen, setLoginModalOpen, setLogoutModalOpen, setSignupModalOpen, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
