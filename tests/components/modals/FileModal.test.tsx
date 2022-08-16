import FileModal from '@/components/modals/FileModal';
import { setSelectedFile } from '@/redux/slices/fileSlice';
import { setFileModalOpen } from '@/redux/slices/modalSlice';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('File Modal', () => {
  // Create the modal root (for react portals) before every test
  beforeAll(() => {
    act(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      modalRoot.setAttribute('data-testid', 'modal-root');
      document.body.appendChild(modalRoot);
    });
  });
  // Clean up after each test
  afterEach(cleanup);

  // Run Tests
  it('will create a component in the modal-root div with the correct rows', () => {
    const { store } = render(<FileModal />);
    act(() => {
      store.dispatch(setFileModalOpen(true));
    });

    let modalRoot = screen.getByTestId('modal-root');
    let row_1 = screen.getByText('Date');
    let row_2 = screen.getByText('Invoice');
    let row_3 = screen.getByText('Country');
    let row_4 = screen.getByText('Customer');
    let row_5 = screen.getByText('Quantity');
    let row_6 = screen.getByText('Stock Code');
    let row_7 = screen.getByText('Price');

    expect(modalRoot).toBeVisible();
    expect(row_1).toBeVisible();
    expect(row_2).toBeVisible();
    expect(row_3).toBeVisible();
    expect(row_4).toBeVisible();
    expect(row_5).toBeVisible();
    expect(row_6).toBeVisible();
    expect(row_7).toBeVisible();
    expect(modalRoot).toContainHTML('Date');
  });

  it('will create a component in the modal-root div with the correct rows', () => {
    const { store } = render(<FileModal />);
    act(() => {
      store.dispatch(setFileModalOpen(true));
      store.dispatch(
        setSelectedFile({
          InvoiceDate: '12th January',
          Description: 'Test goods',
          InvoiceNo: '118',
          Country: 'Malaysia',
          CustomerID: 'Singtel',
          Quantity: '1',
          StockCode: '1010',
          UnitPrice: '1122',
        })
      );
    });

    let modalRoot = screen.getByTestId('modal-root');
    let row_1 = screen.getByText('12th January');
    let row_2 = screen.getByText('1122');
    let row_3 = screen.getByText('118');
    let row_4 = screen.getByText('Malaysia');
    let row_5 = screen.getByText('Singtel');
    let row_6 = screen.getByText('1');
    let row_7 = screen.getByText('1010');
    let header = screen.getByText('test goods');

    expect(modalRoot).toBeVisible();
    expect(row_1).toBeVisible();
    expect(row_2).toBeVisible();
    expect(row_3).toBeVisible();
    expect(row_4).toBeVisible();
    expect(row_5).toBeVisible();
    expect(row_6).toBeVisible();
    expect(row_7).toBeVisible();
    expect(header).toBeVisible();
    expect(modalRoot).toContainHTML('Date');
  });
});
