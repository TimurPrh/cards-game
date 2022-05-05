import React from 'react';
import FlipperCard from '../flipperCard/FlipperCard';
import './cardsList.scss'

const CardsList = ({cardIds, cardClicked, resetCards, difficulty, theme}) => {
  return (
    <div 
      className="cards-list"
      style={difficulty < 4 ?
        {gridTemplateColumns: "repeat(3, auto)"}
        :
        {gridTemplateColumns: "repeat(4, auto)"}  
      }
    >
      {cardIds.map(card => 
        <div key={card.id} className={card.solved ? "cards-list__item animate__pulse" : "cards-list__item"}>
          <FlipperCard 
            id={card.id} 
            cardClicked={cardClicked}
            flip={card.isFlipped}
            img={`icons/${theme}/${card.img}.svg`}
            underFlip={resetCards}
          />
        </div>
      )}
    </div>
  );
};

export default CardsList;