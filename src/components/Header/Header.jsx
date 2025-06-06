import "./Header.css";
// import avatar from "../../assets/avatar.svg";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { WeatherDataContext } from "../../contexts/WeatherDataContext";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
}) {
  const { currentUser, isLoggedIn, handleLogout } =
    useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  console.log(currentUser);
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          {" "}
          <img className="header__logo" alt="WTWR" src={logo} />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__container">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            +Add clothes
          </button>
        )}
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser?.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar-placeholder">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="header__button  header__button_type_login"
              onClick={handleLoginClick}
            >
              Log in
            </button>
            <button
              className="header__button header__button_type_signup"
              onClick={handleRegisterClick}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
//Header
