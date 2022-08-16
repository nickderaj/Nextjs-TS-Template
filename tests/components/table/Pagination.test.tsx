import Pagination, { IPagination } from '@/components/table/Pagination';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pagination Component', () => {
  // Initialise props
  let expectedProps: IPagination;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      numPages: 100,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };
  });

  // Run Tests
  it('is rendered and current page number will be visible', () => {
    render(<Pagination {...expectedProps} />);
    const currentPage = screen.getByText(expectedProps.currentPage);

    expect(currentPage).toBeVisible();
  });

  it('set current page function is called on click', () => {
    render(<Pagination {...expectedProps} />);
    const button = screen.getByText('5');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.setCurrentPage).toBeCalledTimes(1);
  });

  it('renders the correct pages based on design', () => {
    expectedProps.currentPage = 5;
    render(<Pagination {...expectedProps} />);

    const firstPage = screen.getByText('1');
    const lastPage = screen.getByText(expectedProps.numPages);
    const lowestPageAvailable = screen.getByText('3');
    const highestPageAvailable = screen.getByText('7');
    expect(() => screen.getByText('2')).toThrow();
    expect(() => screen.getByText('8')).toThrow();

    expect(firstPage).toBeVisible();
    expect(lastPage).toBeVisible();
    expect(lowestPageAvailable).toBeVisible();
    expect(highestPageAvailable).toBeVisible();
  });
});
