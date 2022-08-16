import Filter from '@/components/filter/Filter';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Dispatch } from 'react';

describe('Filter Component', () => {
  // Initialise props
  let expectedProps: { filter: string; setFilter: Dispatch<React.SetStateAction<string>> };

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      filter: 'test filter',
      setFilter: jest.fn(),
    };
  });

  // Run Tests
  it('is created with an input with the correct placeholder', () => {
    render(<Filter {...expectedProps} />);
    const input = screen.getByPlaceholderText(expectedProps.filter);

    expect(input).toBeVisible();
  });

  it('filter function is called on submit', () => {
    render(<Filter {...expectedProps} />);
    const button = screen.getByRole('filter-submit-button');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.setFilter).toBeCalledTimes(1);
  });
});
