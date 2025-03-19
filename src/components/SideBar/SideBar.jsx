import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="sidebar">
      <div className="sidebar__user-container">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">User name</p>
      </div>
    </section>
  );
}
export default SideBar;
