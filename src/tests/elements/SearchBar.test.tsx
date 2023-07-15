import SearchBar from '@/elements/form/SearchBar';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('SearchBar', () => {
  afterEach(() => cleanup());

  it('renders', () => {
    render(<SearchBar data-testid="search_bar" value="" setValue={() => {}} />);
    const searchBar = screen.getByTestId('search_bar');

    expect(searchBar).toBeInTheDocument();
  });

  it('fires the setValue function on change', () => {
    const fn = jest.fn();
    render(<SearchBar onClick={fn} data-testid="search_bar" value="" setValue={fn} />);

    const searchBar = screen.getByTestId('search_bar');
    fireEvent.change(searchBar, { target: { value: '123' } });
    expect(fn).toHaveBeenCalled();
  });
});
