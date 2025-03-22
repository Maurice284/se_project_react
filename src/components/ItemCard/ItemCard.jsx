import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
