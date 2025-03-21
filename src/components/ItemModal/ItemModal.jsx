function ItemModal({
  activeModal,
  onClose,
  card /*onDelete*/ /*open confirm modal*/,
  openConfirmationModal,
}) {
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-column">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            /* onClick= pass open confirm*/
            type="button"
            className="modal__delete-button"
            onClick={openConfirmationModal}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
