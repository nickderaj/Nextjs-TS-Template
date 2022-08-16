import { IFileData, setSelectedFile } from '@/redux/slices/fileSlice';
import { setFileModalOpen } from '@/redux/slices/modalSlice';
import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination';

export interface ITable {
  loadedData: IFileData[];
  page: number;
  numPages: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

function TableRow({ row }: { row: IFileData }) {
  return (
    <>
      <div className="capitalize col-span-2 xl:col-span-3">{row.Description.toLowerCase()}</div>
      <div>{row.InvoiceDate}</div>
      <div className="hidden xl:block">{row.InvoiceNo}</div>
      <div className="hidden xl:block">{row.Country}</div>
      <div className="hidden xl:block">{row.CustomerID}</div>
      <div className="hidden xl:block">{row.Quantity}</div>
      <div className="hidden xl:block">{row.StockCode}</div>
      <div className="hidden xl:block">{row.UnitPrice}</div>
    </>
  );
}

export default function Table({ loadedData, page, setPage, numPages }: ITable) {
  const [pageInput, setPageInput] = useState<number>(1);
  const dispatch = useDispatch();

  const handleSelectRow = (row: IFileData) => {
    dispatch(setSelectedFile(row));
    dispatch(setFileModalOpen(true));
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) e.target.value = '1';
    if (+e.target.value > numPages) e.target.value = String(numPages);
    setPageInput(+e.target.value);
  };

  const handleSubmitPages = (e: FormEvent, page = pageInput) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 xl:grid-cols-10 py-1 px-4 bg-purple-400 text-white font-bold">
        <div className="col-span-2 xl:col-span-3">Description</div>
        <div>Invoice Date</div>
        <div className="hidden xl:block">Invoice No</div>
        <div className="hidden xl:block">Country</div>
        <div className="hidden xl:block">Customer ID</div>
        <div className="hidden xl:block">Quantity</div>
        <div className="hidden xl:block">Stock Code</div>
        <div className="hidden xl:block">Unit Price</div>
      </div>
      {loadedData.map((row) => (
        <div
          key={row.StockCode}
          onClick={() => handleSelectRow(row)}
          className="grid grid-cols-3 xl:grid-cols-10 bg-purple-200 hover:bg-purple-300 cursor-pointer transition-all duration-300 py-1 px-4 gap-2"
        >
          <TableRow row={row} />
        </div>
      ))}
      <form className="flex gap-2 justify-end" onSubmit={handleSubmitPages}>
        Page:
        <input
          onChange={handlePageChange}
          placeholder={String(page)}
          type="number"
          className="w-20 appearance-none outline-none"
        />
      </form>
      <Pagination numPages={numPages} currentPage={page} setCurrentPage={handleSubmitPages} />
    </div>
  );
}
