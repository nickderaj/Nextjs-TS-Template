import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Global state to control whether any of the modals are open throughout the app
export interface IModalSliceState {
  createEditModalOpen: boolean;
  deleteModalOpen: boolean;
  devModalOpen: boolean;
}

const initialState: IModalSliceState = {
  createEditModalOpen: false,
  deleteModalOpen: false,
  devModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setCreateEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.createEditModalOpen = action.payload;
    },
    setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteModalOpen = action.payload;
    },
    setDevModalOpen: (state, action: PayloadAction<boolean>) => {
      state.devModalOpen = action.payload;
    },
    closeAllModals: (state) => {
      state.createEditModalOpen = false;
      state.deleteModalOpen = false;
      state.devModalOpen = false;
    },
  },
});

export const { setCreateEditModalOpen, setDeleteModalOpen, setDevModalOpen, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
