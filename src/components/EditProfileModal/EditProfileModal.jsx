import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

const EditProfileModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // Pre-fill the form with current user data
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
