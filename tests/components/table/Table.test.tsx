import Table, { ITable } from '@/components/table/Table';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

describe('Table Component', () => {
  // Initialise props
  let expectedProps: ITable;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      loadedData: [
        {
          InvoiceDate: '12th January',
          Description: 'Test goods',
          InvoiceNo: '118',
          Country: 'Malaysia',
          CustomerID: 'Singtel',
          Quantity: '1',
          StockCode: '1010',
          UnitPrice: '1122',
        },
      ],
      page: 1,
      numPages: 100,
      setPage: jest.fn(),
    };
  });

  // Run Tests
  it('is rendered and last page number will be visible', () => {
    render(<Table {...expectedProps} />);
    const lastPage = screen.getByText('100');

    expect(lastPage).toBeVisible();
  });

  it('will open the file modal on click', () => {
    const { store } = render(<Table {...expectedProps} />);
    const button = screen.getByText(expectedProps.loadedData[0].InvoiceDate);

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(store.getState().modal.fileModalOpen).toBeTruthy();
  });
});
