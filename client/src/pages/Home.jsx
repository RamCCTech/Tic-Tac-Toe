import React, { useState, useEffect } from 'react';
import Square from "./Square";
import { useSelector, useDispatch } from 'react-redux';

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

export default function Home() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const { currentUser, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }

    checkForWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleWin = async () => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`);
    if(currentPlayer=='X')
    {
      try {
        const response = await fetch(`/api/user/win-game/${currentUser._id}`, {
          method: 'POST',
          body: JSON.stringify({ gameId: 1 }), // Replace with the actual game ID
        });
    
        const userData = await response.json();
        console.log('User data after winning:', userData);
      } catch (error) {
        console.error('Error updating user data after winning:', error);
      }
    }
    resetBoard();
  };
    


  const handleDraw = () => {
    window.alert("The game ended in a draw");
    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (event) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              index={index}
              player={player}
            />
          ))}
        </div>

        <div className="mx-auto w-96 text-2xl text-serif">
          <p className="text-white mt-5">
            Next Player: <span>{currentPlayer}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
