import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick }) {
  <div className="clothes-section">
    <div>
      <p>Your Items</p>
      <button>+ Add New</button>
    </div>
    <ul className="clothes-section__items">
      {clothingItems
        .filter((card) => card.weather === weatherData.type)
        .map((filteredCard) => (
          <ItemCard
            key={filteredCard._id} //item.id
            item={item}
            // Todo pass as prop
            onCardClick={onCardClick}
          />
        ))}
    </ul>
  </div>;
}

export default ClothesSection;
