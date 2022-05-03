import React from 'react';
import FlipperCard from '../flipperCard/FlipperCard';
import './cardsList.scss'

const CardsList = ({cardIds, cardClicked, resetCards}) => {
  return (
    <div className="cards-list">
      {cardIds.map(card => 
        <div key={card.id} className={card.solved ? "cards-list__item animate__pulse" : "cards-list__item"}>
          <FlipperCard 
            id={card.id} 
            cardClicked={cardClicked}
            flip={card.isFlipped}
            img={`icons/${card.img}.svg`}
            underFlip={resetCards}
          />
        </div>
      )}
    </div>
  );
};

export default CardsList;