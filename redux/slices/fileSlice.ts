import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFileData {
  Country: string;
  CustomerID: string;
  Description: string;
  InvoiceDate: string;
  InvoiceNo: string;
  Quantity: string;
  StockCode: string;
  UnitPrice: string;
}

export interface ISliceState {
  filename: string;
  selectedFile: IFileData;
}

const initialState: ISliceState = {
  filename: '',
  selectedFile: {
    Country: '',
    CustomerID: '',
    Description: '',
    InvoiceDate: '',
    InvoiceNo: '',
    Quantity: '',
    StockCode: '',
    UnitPrice: '',
  },
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFilename: (state, action: PayloadAction<string>) => {
      state.filename = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<IFileData>) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setFilename, setSelectedFile } = fileSlice.actions;

export default fileSlice.reducer;
