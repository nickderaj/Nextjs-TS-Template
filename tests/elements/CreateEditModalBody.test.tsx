import CreateEditModalBody, { ICreateEditModalBody } from '@/components/elements/modals/CreateEditModalBody';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { render } from '../utils/test-utils';

describe('Create & Edit Modal Body', () => {
  // Initialise props
  let expectedProps: ICreateEditModalBody;

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
      createOrEdit: 'create',
      setName: jest.fn(),
      setAge: jest.fn(),
      setGender: jest.fn(),
      isSubmitting: false,
      error: '',
      handleSubmit: jest.fn((e) => e.preventDefault()),
    };
  });

  // Run Tests
  it('edit: renders with correct props', () => {
    render(<CreateEditModalBody {...expectedProps} />);
    const modal = screen.getByText(/Edit Friend/i);

    expect(modal).toBeVisible();
  });

  it('create: renders with correct props', () => {
    expectedProps.selectedFriend = null;
    render(<CreateEditModalBody {...expectedProps} />);
    const modal = screen.getByText('New Friend');

    expect(modal).toBeVisible();
  });

  it('edit: will submit with a selected friend', () => {
    render(<CreateEditModalBody {...expectedProps} />);
    const button = screen.getByText('EDIT');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.handleSubmit).toBeCalled();
  });

  it('create: will not submit the form with an empty body', () => {
    expectedProps.selectedFriend = null;
    render(<CreateEditModalBody {...expectedProps} />);
    const button = screen.getByText('CREATE');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.handleSubmit).not.toBeCalled();
  });

  it('will not submit isSubmitting is set to true', () => {
    expectedProps.isSubmitting = true;
    render(<CreateEditModalBody {...expectedProps} />);
    const button = screen.getByText('EDIT');

    expect(button).toBeVisible();
    fireEvent.click(button);
    expect(expectedProps.handleSubmit).not.toBeCalled();
  });

  it('error message is visible', () => {
    expectedProps.error = 'Something went wrong';
    render(<CreateEditModalBody {...expectedProps} />);
    const error = screen.getByText(expectedProps.error);

    expect(error).toBeVisible();
  });
});
