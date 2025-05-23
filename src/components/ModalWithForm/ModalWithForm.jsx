import "./ModalWithForm.css";

function ModalWithForm({
  children,

  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-grey"
        ></button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
