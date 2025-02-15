import "./Header.css";
import avatar from "../../assets/avatar.svg";
import logo from "../../assets/logo.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          +Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Tereence Tegegne</p>
          <img src={avatar} alt="Tereence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
