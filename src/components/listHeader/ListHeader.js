import React from 'react';
import './listHeader.scss'

const ListHeader = ({ended, gameMoves, resetGame}) => {

  const getMoves = (c) => {
    function isUnitNumber(number) {
      return (number === 1 || (number > 20 && number % 10 === 1));
    }

    function isMultipleNumber(number) {
      return (number >= 2 && number <= 4) || (number > 20 && (number % 10 >= 2 && number % 10 <= 4));
    }

    let result = c

    if (isUnitNumber(c)) {
      result += ' ход';
    } else if (isMultipleNumber(c)) {
      result += ' хода';
    } else if (c > 4) {
      result += ' ходов';
    }

    return result
  }

  return (
    <div className='list-header'>
      <div className='list-header__moves'>
        {ended ?
          <div>
            Игра окончена за {getMoves(gameMoves)}
          </div>
          :
          <div>
            Ходов: {gameMoves}
          </div>
        }
      </div>
      <button 
        onClick={resetGame}
        className='list-header__reset'
        >Сброс</button>
    </div>
  );
};

export default ListHeader;