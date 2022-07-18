import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: React.ReactNode;
}

// <Modal>{children}</Modal> to separate modals into the modal-root div
export default function Modal({ children }: IModal) {
  const [modalRoot, setModalRoot] = useState<HTMLElement>();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root') as HTMLElement);
  }, []);

  if (modalRoot) return createPortal(children, modalRoot);
  return <></>;
}
