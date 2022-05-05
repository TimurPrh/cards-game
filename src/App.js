import { useEffect, useState } from 'react';
import CardsList from './components/cardsList/CardsList';
import ListHeader from './components/listHeader/ListHeader';
import iconsNames from './icons.json';
import SettingsComponent from './components/settingsComponent/SettingsComponent';
import './App.css';

function App() {
  const [cardIds, setCardIds] = useState([])
  const [flippedCards, setFlippedCards] = useState(0)
  const [ended, setEnded] = useState(false)
  const [gameMoves, setGameMoves] = useState(0)
  const [resetCards, setResetCards] = useState(false)
  const [difficulty, setDifficulty] = useState(3)
  const [theme, setTheme] = useState('summer')

  const changeCardFlipped = (idx, bool) => {
    setCardIds(prev => {
      const newState = [...prev]
      newState[idx].isFlipped = bool
      return newState
    })
  }

  const getRandomDoubledArray = (max, count) => {
    const randomNumbers = []
    while (randomNumbers.length < count) {
      const val = Math.floor(Math.random() * max)
      if (randomNumbers.indexOf(val) === -1) {
        randomNumbers.push(val)
      }
    }
    const doubleNumbers = [...randomNumbers, ...randomNumbers]
    const mixed = []
    doubleNumbers.forEach(item => {
      let index = Math.round(Math.random() * (count * 2 - 1))

      while (Number.isInteger(mixed[index])) {
        if (index >= doubleNumbers.length - 1) {
          index = 0
        } else {
          index += 1
        } 
      }

      mixed[index] = item
    })

    return mixed
  }

  const resetCardIds = () => {
    const randomArray = getRandomDoubledArray(iconsNames[theme].length, difficulty)

    setCardIds(() => {
      const arr = []
      for (let i = 0; i < randomArray.length; i++) {
        arr.push({
          id: i,
          gameId: randomArray[i],
          img: iconsNames[theme][randomArray[i]],
          isFlipped: false,
          solved: false
        })
      }
      return arr
    })
  }

  useEffect(() => {
    resetCardIds()
  }, [difficulty, theme])

  useEffect(() => {
    if (flippedCards > 1) {
      setGameMoves(gameMoves => gameMoves + 1)
      const filtered = cardIds.filter(card => card.isFlipped && !card.solved)
      console.log(filtered)
      if (filtered[0].gameId === filtered[1].gameId) {
        console.log('good!')
        setTimeout(() => {
          setCardIds(prev => {
            const newState = [...prev]
            filtered.forEach(item => {
              newState[cardIds.findIndex(el => el.id === item.id)].solved = true
            })
            return newState
          })
          setFlippedCards(0)
        }, 1000)
      } else {
        console.log('else')
        setTimeout(() => {
          setCardIds(prev => {
            const newState = [...prev]
            
            newState.map((card, idx) => {
              if (!card.solved) {
                card.isFlipped = false
              }
              
              return card
            })
            return newState
          })
          setFlippedCards(0)
        }, 2000)
      }
      
    }
  // eslint-disable-next-line
  }, [flippedCards])

  useEffect(() => {
    setResetCards(false)
    if (cardIds.length > 0) {
      setEnded(cardIds.length === cardIds.filter(card => card.solved).length)
    }
  }, [cardIds])

  const cardClicked = (id) => {
    const index = cardIds.findIndex(el => el.id === id)

    if (!cardIds[index].isFlipped && flippedCards < 2) {
      changeCardFlipped(index, true)
      setFlippedCards(flippedCards + 1)
    }
  }

  const resetGame = () => {
    setFlippedCards(0)
    setGameMoves(0)
    setResetCards(true)
    resetCardIds()
  }

  const difficultyChange = (level) => {
    resetGame()
    setDifficulty(level)
  }

  const themeChange = (theme) => {
    resetGame()
    setTheme(theme)
  }

  return (
    <div className="App">
      <div className="container">
        <div className={`wrapper theme_${theme}`}>
          <SettingsComponent difficultyChange={difficultyChange} themeChange={themeChange}/>
          <ListHeader ended={ended} gameMoves={gameMoves} resetGame={resetGame}/>
          <CardsList cardIds={cardIds} cardClicked={cardClicked} resetCards={resetCards} difficulty={difficulty} theme={theme}/>
        </div>
      </div>
    </div>
  );
}

export default App;