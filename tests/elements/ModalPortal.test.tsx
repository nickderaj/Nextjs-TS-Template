import Modal from '@/components/elements/modals/Modal';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Modal Portal', () => {
  // Create the modal root (for react portals) before all tests
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
  it('will create a component in the modal-root div', () => {
    render(
      <Modal>
        <div>Magical Wizardry</div>
      </Modal>
    );

    let modalRoot = screen.getByTestId('modal-root');
    let div = screen.getByText('Magical Wizardry');

    expect(modalRoot).toBeVisible();
    expect(div).toBeVisible();
    expect(modalRoot).toContainHTML('Magical Wizardry');
  });
});
