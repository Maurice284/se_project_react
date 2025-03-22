import "../ModalWithForm/ModalWithForm";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onDelete, card }) {
  const handleDeleteClick = () => {
    onDelete(card);
  };
  return (
    <div
      className={`modal modal__type_delete-confirmation ${
        isOpen && "modal__opened"
      }`}
    >
      <div className="modal__content modal__content_content_confirmation">
        <button type="button" className="modal__close" onClick={onClose} />

        <h3 className="modal__confirmation-title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h3>
        <button onClick={handleDeleteClick}>Yes, delete item</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
