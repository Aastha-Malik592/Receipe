import * as Dialog from "@radix-ui/react-dialog";
import "./modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />

        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">
            {title}
          </Dialog.Title>

          {children}

          <Dialog.Close asChild>
            <button className="close-btn">✕</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;