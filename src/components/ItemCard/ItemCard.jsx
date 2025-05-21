import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLiked = item.likes
    ? item.likes.some((id) => id === currentUser?._id)
    : false;
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
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
      {currentUser && (
        <button className={itemLikeButtonClassName} onClick={handleLike}>
          Like
        </button>
      )}
    </div>
  );
}

export default ItemCard;
