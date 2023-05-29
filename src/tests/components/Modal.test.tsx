import Modal from '@/components/modals/Modal';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Modal', () => {
  // Create the modal root (react portals) before every test
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

  // Run Tests
  it('will create a component in the modal-root div', () => {
    render(
      <Modal>
        <div>Magical Wizardry</div>
      </Modal>,
    );

    const modalRoot = screen.getByTestId('modal-root');
    const div = screen.getByText('Magical Wizardry');

    expect(modalRoot).toBeVisible();
    expect(div).toBeVisible();
    expect(modalRoot).toContainHTML('Magical Wizardry');
  });
});
