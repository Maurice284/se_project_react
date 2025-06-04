import { useContext, useEffect, useState } from "react";
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
import auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const CurrentUser = useContext(CurrentUserContext);

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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  ////////
  //create open confirmation modal here
  //////

  const handleDelete = () => {
    console.log("Test");
    const token = localStorage.getItem("token");
    api

      .deleteItem(cardToDelete._id, token)
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
    const token = localStorage.getItem("token");
    return api
      .addItem({ imageUrl, name, weather }, token)
      .then((data) => {
        console.log(data);
        setClothingItems((prevItems) => [data, ...prevItems]);
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
        console.log("Weather data before setting:", filteredData);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        console.log("Raw data from API:", data);
        setClothingItems(data.reverse()); // Update state with fetched items
      })
      .catch(console.error);
  }, []);

  // auto logs the user in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleRegister = async (formData) => {
    try {
      // Call the signup function from auth.js
      const userData = await auth.signup(formData);

      await handleLogin({ email: formData.email, password: formData.password });

      //auto login the user (call the handleLogin function)

      // Close the modal
      setActiveModal("");
    } catch (error) {
      // Handle any errors
      console.error("Registration error:", error);
      // You might want to show an error message to the user
    }
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          console.log("this is the loggen in person", isLoggedIn);
          closeActiveModal();
          fetchUserInfo(res.token);
        }
      })
      .catch((err) => console.log("Login error:", err));
  };

  // Call the signin function from auth.js
  // current issue is that "userData" does not acutally contain the user's info. It only contains the token.
  //we want to get the token back from the backend, but also the user's info so that we can store it in the c
  //currentUser state variable
  // 2 possible soltions: you have a controller on the backend that gets the currently logged in user's info and
  //you can make a request to that route to get t hat info. Alternatively, you can try to modify the login controller
  //so t hat it sends back more than just the token; it gives us the user info as well
  const fetchUserInfo = async (token) => {
    try {
      const res = await auth.checkToken(token);
      if (res) {
        setIsLoggedIn(true);
        setCurrentUser(res);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogout = () => {
    // Remove the token from storage
    localStorage.removeItem("token");

    // Reset the user data to null
    setCurrentUser(null);

    // Set logged-in status to false
    setIsLoggedIn(false);
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("token"); // Note: you're using "token" not "jwt"
    // Check if this card is not currently liked
    !isLiked
      ? api
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("token"); // Note: change from "token" to "jwt"
    auth
      .updateProfile({ name, avatar }, token)
      .then((userData) => {
        console.log(userData);
        console.log(currentUser);
        setCurrentUser(userData.data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          isLoggedIn,
          setIsLoggedIn,
          handleLogout,
          handleEditProfileClick,
        }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              // isLoggedIn={isLoggedIn}
              // currentUser={currentUser}
            />

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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
            currentUserId={currentUser?._id}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
            currentUser={currentUser}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onDelete={handleDelete}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSubmit={handleRegister}
            handleLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
