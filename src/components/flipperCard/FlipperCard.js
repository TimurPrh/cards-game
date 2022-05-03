import './flipperCard.scss'

const FlipperCard = ({id, cardClicked, flip, img, underFlip}) => {
  let cardClass = flip ? "flipper-card__wrapper flipper-card__wrapper_flip" : "flipper-card__wrapper"
  if (underFlip) {
    cardClass += " flipper-card__wrapper_under-flip"
  }

  const onCardClick = () => {
    cardClicked(id)
  }

  return (
    <div className = "flipper-card">
      <div 
        className={cardClass}
        onClick={onCardClick}
      >
        <div className="flipper-card__front">
          
        </div>
        <div className="flipper-card__back">
          <img src={img} alt={img}/>
        </div>
      </div>
    </div>
  );
};

export default FlipperCard;