import SampleModal from '@/components/modals/SampleModal';
import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Sample Modal', () => {
  // Create the modal root (for react portals) before every test
  beforeEach(() => {
    act(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      modalRoot.setAttribute('data-testid', 'modal-root');
      document.body.appendChild(modalRoot);
    });
  });
  // Clean up after each test
  afterEach(cleanup);
  afterEach(() => {
    const modalRoot = screen.getByTestId('modal-root');
    modalRoot.remove();
  });

  it('will start with the initial state', () => {
    const { store } = render(<SampleModal />);

    const modalState = store.getState().modal;
    expect(modalState.sampleModalOpen).toEqual(false);
  });

  it('will display the sample modal upon opening', () => {
    const { store } = render(<SampleModal />);
    act(() => {
      store.dispatch(setSampleModalOpen(true));
    });

    const modalRoot = screen.getByTestId('modal-root');
    const div = screen.getByText('Sample Modal');

    expect(modalRoot).toBeVisible();
    expect(div).toBeVisible();
    expect(modalRoot).toContainHTML('Sample Modal');
  });

  it('will close the sample modal when clicking cancel', () => {
    const { store } = render(<SampleModal />);
    act(() => {
      store.dispatch(setSampleModalOpen(true));
    });

    const modalRoot = screen.getByTestId('modal-root');
    const cancelButton = screen.getByText('CANCEL');

    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeVisible();
    expect(modalRoot).not.toContainHTML('Sample Modal');
  });
});
