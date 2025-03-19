import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  console.log(clothingItems);
  return (
    <section className="clothes-section">
      <div className="clothes-section__button-container">
        <p className="clothes-section__title">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__add-new">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          // .filter((card) => card.weather === weatherData.type)
          .map((filteredCard) => {
            console.log("id should exist:", filteredCard._id);
            return (
              <ItemCard
                key={filteredCard._id} //item.id
                item={filteredCard}
                // Todo pass as prop
                onCardClick={onCardClick}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
