import Button from '@/elements/buttons/Button';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  afterEach(() => cleanup());

  it('renders', () => {
    render(<Button data-testid="btn" />);
    const button = screen.getByTestId('btn');

    expect(button).toBeInTheDocument();
  });

  it('fires an event on onClick', () => {
    const fn = jest.fn();
    render(<Button onClick={fn} data-testid="btn" />);

    const button = screen.getByTestId('btn');
    fireEvent.click(button);
    expect(fn).toHaveBeenCalled();
  });
});
