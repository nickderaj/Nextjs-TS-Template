import UploadModal from '@/components/modals/UploadModal';
import { setUploadModalOpen } from '@/redux/slices/modalSlice';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Upload Modal', () => {
  // Create the modal root (for react portals) before every test
  beforeAll(() => {
    act(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      modalRoot.setAttribute('data-testid', 'modal-root');
      document.body.appendChild(modalRoot);
    });
  });
  // Clean up after each test
  afterEach(cleanup);

  // Run Tests
  it('will create a component in the modal-root div with the correct title', () => {
    const { store } = render(<UploadModal />);
    act(() => {
      store.dispatch(setUploadModalOpen(true));
    });

    let modalRoot = screen.getByTestId('modal-root');
    expect(modalRoot).toBeVisible();
    expect(modalRoot).toContainHTML('Upload File');
    let title = screen.getByText('Upload File');
    expect(title).toBeVisible();
  });

  it('will close the modal on clicking cancel', () => {
    const { store } = render(<UploadModal />);
    act(() => {
      store.dispatch(setUploadModalOpen(true));
    });

    let button = screen.getByText('Cancel');
    fireEvent.click(button);
    expect(store.getState().modal.uploadModalOpen).toBeFalsy();
  });
});
