import Button, { IButton } from '@/components/buttons/Button';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  // Initialise props
  let expectedProps: IButton;

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      title: 'sample',
      onClick: jest.fn(),
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
});
