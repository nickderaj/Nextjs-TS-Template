import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
  loading: boolean;
  uploadModalOpen: boolean;
  fileModalOpen: boolean;
}

const initialState: ISliceState = {
  loading: false,
  uploadModalOpen: false,
  fileModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setUploadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.uploadModalOpen = action.payload;
    },
    setFileModalOpen: (state, action: PayloadAction<boolean>) => {
      state.fileModalOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    closeAllModals: (state) => {
      if (!state.loading) {
        state.uploadModalOpen = false;
        state.fileModalOpen = false;
      }
    },
  },
});

export const { setUploadModalOpen, setFileModalOpen, setLoading, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
