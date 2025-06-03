import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onSubmit, handleRegisterClick }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    onSubmit(formData);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
        {error && <span className="modal__error">{error}</span>}
        <button type="submit" className="modal__submit">
          Login
        </button>

        <button
          type="button"
          className="modal__button"
          onClick={handleRegisterClick}
        >
          or signup
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
