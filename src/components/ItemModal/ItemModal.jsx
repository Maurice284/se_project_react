import "./ItemModal.css";
function ItemModal({ activeModal, onClose, card, onDelete }) {
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

        <img src={card.imageUrl} alt="" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-column">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={onDelete}
            type="button"
            className="modal__delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
