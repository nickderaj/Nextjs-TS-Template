import ModalPortal from '@/components/modals/ModalPortal';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Modal', () => {
  // Create the modal root (react portals) before every test
  let modalRoot: HTMLDivElement;
  beforeEach(() => {
    act(() => {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      modalRoot.setAttribute('data-testid', 'modal-root');
      document.body.appendChild(modalRoot);
    });
  });
  afterEach(() => {
    cleanup();
    modalRoot.remove();
  });

  // Run Tests
  it('will create a component in the modal-root div', () => {
    render(
      <ModalPortal onClose={() => {}} isOpen={true}>
        <div>Magical</div>
      </ModalPortal>,
    );

    modalRoot = screen.getByTestId('modal-root');
    const div = screen.getByText('Magical');

    expect(modalRoot).toBeVisible();
    expect(div).toBeVisible();
    expect(modalRoot).toContainHTML('Magical');
  });

  it('will not render if isOpen is false', () => {
    render(
      <ModalPortal onClose={() => {}} isOpen={false}>
        <div>Magical</div>
      </ModalPortal>,
    );

    modalRoot = screen.getByTestId('modal-root');
    expect(modalRoot).toBeVisible();
    expect(() => screen.getByText('Magical')).toThrow();
  });
});
