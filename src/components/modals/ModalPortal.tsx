import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

const ModalPortal: React.FC<Props> = ({ children, isOpen = false, onClose }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement>();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root') as HTMLElement);
  }, []);

  if (modalRoot && isOpen)
    return createPortal(
      <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-30">
        <div
          className="bg-black/[0.5] z-40 absolute h-full w-full backdrop-blur-[1px]"
          onClick={onClose}
        />
        {children}
      </div>,
      modalRoot,
    );
  return null;
};

export default ModalPortal;
