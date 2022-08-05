import Button, { IButton } from '@/components/elements/buttons/Button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button Element', () => {
  // Initialise props
  let expectedProps: IButton;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      title: 'sample',
      onClick: jest.fn(),
      variant: 'primary',
      type: 'button',
      disabled: false,
    };
  });

  // Run Tests
  it('is created and function called on click', () => {
    render(<Button {...expectedProps} />);
    const button = screen.getByText(expectedProps.title);

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.onClick).toBeCalledTimes(1);
  });

  it('is not called when the button is disabled', () => {
    expectedProps.disabled = true;
    render(<Button {...expectedProps} />);
    const button = screen.getByText(expectedProps.title);

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.onClick).toBeCalledTimes(0);
  });
});
