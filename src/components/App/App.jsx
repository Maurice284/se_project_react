import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  ////////
  //create open confirmation modal here
  //////

  const handleDelete = () => {
    console.log("Test");
    api
      .deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    // update clothingItem array
    // close the modal
    return api
      .addItem({ imageUrl, name, weather })
      .then((data) => {
        console.log(data);
        setClothingItems((prevItems) => [
          { name, imageUrl: imageUrl, weather, _id: data._id },
          ...prevItems,
        ]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error from addItem:", error);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data); // Update state with fetched items
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <div className="page__content">
          <Routes>
            {" "}
            <Route
              path="/"
              element={
                //pass clothing Item as a prop
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"} // true
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />

        <ItemModal
          card={selectedCard || {}}
          onClose={closeActiveModal}
          openConfirmationModal={openConfirmationModal}
          isOpen={activeModal === "preview"}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeActiveModal}
          onDelete={handleDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
