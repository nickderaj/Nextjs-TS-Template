import Spinner from '@/elements/loaders/Spinner';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';

describe('Spinner', () => {
  afterEach(cleanup);

  it('renders', () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
