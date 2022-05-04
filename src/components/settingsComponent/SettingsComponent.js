import React, { useState } from 'react';
import './settingsComponent.scss'

const SettingsComponent = ({difficultyChange}) => {
  const [difficulty, setDifficulty] = useState('Easy')
  const [difficultyVisible, setDifficultyVisible] = useState(false)

  const onDifficultyChange = (e, level) => {
    difficultyChange(level)
    setDifficulty(e.target.innerHTML)
    setDifficultyVisible(false)
  }

  return (
    <div className='settings-component'>
      <div className="settings-component__difficulty-description">
        Уровень сложности:
      </div>
      <div className="settings-component__difficulty">
        <div 
          onClick={() => setDifficultyVisible(prev => !prev)}
          className="settings-component__difficulty-header">
          {difficulty}
        </div>
        <div 
          className={difficultyVisible ? 
          "settings-component__difficulty-menu settings-component__difficulty-menu_visible"
          :
          "settings-component__difficulty-menu"}>
          <div 
            onClick={(e) => onDifficultyChange(e, 3)}
            className="settings-component__difficulty-item"
            >Easy</div>
          <div 
            onClick={(e) => onDifficultyChange(e, 6)}
            className="settings-component__difficulty-item"
            >Medium</div>
          <div 
            onClick={(e) => onDifficultyChange(e, 8)}
            className="settings-component__difficulty-item"
            >Hard</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;