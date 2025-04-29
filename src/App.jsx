import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import SudokuBoard from './components/SudokuBoard';

const screens = {
  MENU: 'menu',
  GAME: 'game',
};

function App() {
  const [screen, setScreen] = useState(screens.MENU);
  const [difficulty, setDifficulty] = useState('medium');
  const [savedGame, setSavedGame] = useState(null);

  function handleLoadGame() {
    const savedGame = JSON.parse(localStorage.getItem('savedGame'));
    if (savedGame) {
      setSavedGame(savedGame);
      setScreen(screens.GAME);
    } else {
      alert('No saved game found!');
    }
  }

  return (
    <div>
      {screen === screens.MENU && (
        <MainMenu
          onStart={(selectedDifficulty) => {
            setDifficulty(selectedDifficulty);
            setSavedGame(null); // Start a fresh game
            setScreen(screens.GAME);
          }}
          onLoadGame={handleLoadGame}
        />
      )}
      {screen === screens.GAME && (
        <SudokuBoard
          difficulty={savedGame?.difficulty || difficulty}
          initialBoard={savedGame?.board || null}
          initialTimer={savedGame?.timer || 0}
          onBack={() => setScreen(screens.MENU)}
        />
      )}
    </div>
  );
}

export default App;