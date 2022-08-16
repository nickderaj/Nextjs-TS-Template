import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Modal from './Modal';

export default function FileModal() {
  const { fileModalOpen } = useSelector((state: RootState) => state.modal);
  const { selectedFile } = useSelector((state: RootState) => state.file);

  return (
    <>
      {fileModalOpen && (
        <Modal>
          <div className="bg-neutral-50 z-50 rounded-md p-6 lg:py-12 lg:px-16 flex flex-col  duration-300 transition-all relative">
            <h4 className="text-lg text-center  mb-2 pb-2 capitalize border-b border-purple-400">
              {selectedFile.Description.toLowerCase()}
            </h4>
            <div className="grid grid-cols-2">
              <div>Date</div>
              <div>{selectedFile.InvoiceDate}</div>
              <div>Invoice</div>
              <div>{selectedFile.InvoiceNo}</div>
              <div>Country</div>
              <div>{selectedFile.Country}</div>
              <div>Customer</div>
              <div>{selectedFile.CustomerID}</div>
              <div>Quantity</div>
              <div>{selectedFile.Quantity}</div>
              <div>Stock Code</div>
              <div>{selectedFile.StockCode}</div>
              <div>Price</div>
              <div>{selectedFile.UnitPrice}</div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
