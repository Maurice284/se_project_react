import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import { useContext } from "react";

function SideBar() {
  const { currentUser, handleEditProfileClick, handleLogout } =
    useContext(CurrentUserContext);
  return (
    <section className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="profile__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button className="profile__edit-button" onClick={handleEditProfileClick}>
        Edit Profile
      </button>
      <button className="sidebar__logout-button" onClick={handleLogout}>
        Log out
      </button>
    </section>
  );
}
export default SideBar;
