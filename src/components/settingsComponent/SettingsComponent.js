import React, { useEffect, useRef, useState } from 'react';
import './settingsComponent.scss'

const SettingsComponent = ({difficultyChange, themeChange}) => {
  const [difficulty, setDifficulty] = useState('Easy')
  const [difficultyVisible, setDifficultyVisible] = useState(false)
  const [theme, setTheme] = useState('Summer')
  const [themeVisible, setThemeVisible] = useState(false)

  function useOutsideAlerter(ref, type) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          switch (type) {
            case 'difficulty':
              setDifficultyVisible(false)
              break;
            case 'theme':
              setThemeVisible(false)
              break;
            default:
              break;
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const onDifficultyChange = (e, level) => {
    difficultyChange(level)
    setDifficulty(e.target.innerHTML)
    setDifficultyVisible(false)
  }

  const onThemeChange = (e) => {
    themeChange(e.target.innerHTML.toLowerCase())
    setTheme(e.target.innerHTML)
    setThemeVisible(false)
  }

  const difficultyRef = useRef(null);
  const themeRef = useRef(null);
  useOutsideAlerter(difficultyRef, 'difficulty');
  useOutsideAlerter(themeRef, 'theme');

  return (
    <div className='settings-component'>
      <div className='settings-component__item' ref={difficultyRef}>
        <div className="settings-component__option-description">
          Уровень сложности:
        </div>
        <div className="settings-component__option">
          <button 
            onClick={() => setDifficultyVisible(prev => !prev)}
            className="settings-component__option-header">
            {difficulty}
          </button>
          <div 
            className={difficultyVisible ? 
            "settings-component__option-menu settings-component__option-menu_visible"
            :
            "settings-component__option-menu"}>
            <button 
              onClick={(e) => onDifficultyChange(e, 3)}
              className="settings-component__option-item"
              >Easy</button>
            <button 
              onClick={(e) => onDifficultyChange(e, 6)}
              className="settings-component__option-item"
              >Medium</button>
            <button 
              onClick={(e) => onDifficultyChange(e, 8)}
              className="settings-component__option-item"
              >Hard</button>
          </div>
        </div>
      </div>
      <div className='settings-component__item' ref={themeRef}>
        <div className="settings-component__option-description">
          Тема:
        </div>
        <div className="settings-component__option">
          <button 
            onClick={() => setThemeVisible(prev => !prev)}
            className="settings-component__option-header">
            {theme}
          </button>
          <div 
            className={themeVisible ? 
            "settings-component__option-menu settings-component__option-menu_visible"
            :
            "settings-component__option-menu"}>
            <button 
              onClick={(e) => onThemeChange(e)}
              className="settings-component__option-item"
              >Summer</button>
            <button 
              onClick={(e) => onThemeChange(e)}
              className="settings-component__option-item"
              >Duotone</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;