import "../ModalWithForm/ModalWithForm.css";
//import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  isOpen,
  onClose,
  card /*onDelete*/ /*open confirm modal*/,
  openConfirmationModal,
  currentUser,
}) {
  const handleDeleteClick = () => {
    openConfirmationModal(card);
  };

  const { handleLogout } = useContext(CurrentUserContext);

  return (
    <div className={`modal modal_type_image ${isOpen ? "modal__opened" : ""}`}>
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
          {currentUser._id === card.owner && (
            <div>
              <button
                type="button"
                className="modal__delete-button"
                onClick={handleDeleteClick}
              >
                Delete Item
              </button>
              <button
                type="button"
                className="modal__logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
