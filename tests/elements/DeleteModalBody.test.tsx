import DeleteModalBody, { IDeleteModalBody } from '@/components/elements/modals/DeleteModalBody';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { render } from '../utils/test-utils';

describe('Delete Modal Body', () => {
  // Initialise props
  let expectedProps: IDeleteModalBody;

  // Create the modal root (for react portals) before all tests
  beforeAll(() => {
    act(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      modalRoot.setAttribute('data-testid', 'modal-root');
      document.body.appendChild(modalRoot);
    });
  });

  // Give props sample values
  beforeEach(() => {
    expectedProps = {
      selectedFriend: {
        id: '118',
        name: 'Nick',
        age: 28,
        gender: 'Male',
      },
      isSubmitting: false,
      handleSubmit: jest.fn((e) => e.preventDefault()),
    };
  });

  // Run Tests
  it('create: renders with correct props', () => {
    render(<DeleteModalBody {...expectedProps} />);
    const modal = screen.getByText('Delete Friend');

    expect(modal).toBeVisible();
  });

  it('will submit with a selected friend', () => {
    render(<DeleteModalBody {...expectedProps} />);
    const button = screen.getByText('DELETE');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.handleSubmit).toBeCalled();
  });

  it('will not submit isSubmitting is set to true', () => {
    expectedProps.isSubmitting = true;
    render(<DeleteModalBody {...expectedProps} />);
    const button = screen.getByText('DELETE');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.handleSubmit).not.toBeCalled();
  });
});
