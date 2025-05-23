import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onSubmit, handleLoginClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText2={"or log in"}
      has2ndButton={true}
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          placeholder="Avatar URL"
        />
      </label>

      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
      </label>

      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Next
        </button>

        <button
          type="button"
          className="modal__button"
          onClick={handleLoginClick}
        >
          or log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
