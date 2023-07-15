import Dropdown from '@/elements/form/Dropdown';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Dropdown', () => {
  afterEach(() => cleanup());

  it('renders', () => {
    render(
      <Dropdown
        data-testid="dropdown"
        value="yes"
        setValue={() => {}}
        options={['yes', 'no', 'maybe']}
      />,
    );
    const dropdown = screen.getByTestId('dropdown');

    expect(dropdown).toBeInTheDocument();
  });

  it('fires the setValue function on change', () => {
    const fn = jest.fn();
    render(
      <Dropdown
        data-testid="dropdown"
        value="yes"
        setValue={fn}
        options={['yes', 'no', 'maybe']}
      />,
    );

    const dropdown = screen.getByTestId('dropdown');
    fireEvent.change(dropdown, { target: { value: 'no' } });
    expect(fn).toHaveBeenCalled();
  });

  it('does not fire the setValue function on clicking the same option', () => {
    const fn = jest.fn();
    render(
      <Dropdown
        data-testid="dropdown"
        value="yes"
        setValue={fn}
        options={['yes', 'no', 'maybe']}
      />,
    );

    const dropdown = screen.getByTestId('dropdown');
    fireEvent.change(dropdown, { target: { value: 'yes' } });
    expect(fn).toHaveBeenCalled();
  });
});
