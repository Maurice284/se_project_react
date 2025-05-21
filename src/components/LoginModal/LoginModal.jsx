import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onSubmit }) => {
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
    onSubmit(formData).catch((err) => {
      setError("Invalid email or password");
    });
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
      {error && <span className="modal__error">{error}</span>}
    </ModalWithForm>
  );
};

export default LoginModal;
