import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import { useForm } from "../../utils/useForm";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
}) {
  // const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [weather, setWeather] = useState("");

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleImageUrlChange = (e) => {
  //   setImageUrl(e.target.value);
  // };

  // const handleWeatherChange = (e) => {
  //   setWeather(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit(values).then(() => {
      setValues({ name: "", imageUrl: "", weather: "" });
    });
  };

  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  return (
    <ModalWithForm
      name="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="Clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.title}
        />
      </label>

      <label className="modal__label">
        Image{" "}
        <input
          name="imageUrl"
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          minLength="1"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <div>
          <label
            htmlFor="choiceHot"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="choiceHot"
              type="radio"
              className="modal__radio-input"
              value="hot"
              name="weather"
              onChange={handleChange}
              checked={values.weather === "hot"}
            />
            Hot
          </label>
        </div>
        <div>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="choiceWarm"
              type="radio"
              value="warm"
              name="weather"
              onChange={handleChange}
              checked={values.weather === "warm"}
            />
            Warm
          </label>
        </div>

        <div>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="choiceCold"
              type="radio"
              className="modal__radio-input"
              value="cold"
              name="weather"
              onChange={handleChange}
              checked={values.weather === "cold"}
            />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
