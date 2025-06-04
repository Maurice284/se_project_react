import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) => {
  const { currentUser, handleEditProfileClick } =
    useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems.filter(
          (item) => item.owner === currentUser._id
        )}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        handleAddClick={handleAddClick}
      />
    </div>
  );
};

export default Profile;
