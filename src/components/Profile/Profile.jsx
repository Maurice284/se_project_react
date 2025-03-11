import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick }) {
  return (
    <div className="Profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      ;
      <section className="profile__clothing-items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}
export default Profile;
