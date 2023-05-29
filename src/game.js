const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const { updateAttackResult } = require('./mainContent');
const { isGameOver } = require('./gameutils');

// const gameLoop = async (p1, ai, attackInput, gameState) => {
//   if (!gameState.isGameOver) {
//     if (gameState.currentPlayer === p1) {
//       if (p1.gameBoard.allShipsSunk()) {
//         gameState.isGameOver = true;
//         console.log(`${p1.name} Wins!`);
//         return `${p1.name} Wins!`;
//       }
//       const result = p1.attackEnemyGameBoard(attackInput);
//       console.log(result);
//       updateAttackResult(p1.name, result);
//       gameState.currentPlayer = ai;
//     }
//     if (gameState.currentPlayer === ai) {
//       if (ai.gameBoard.allShipsSunk()) {
//         gameState.isGameOver = true;
//         console.log('Ai Wins!');
//         return 'Ai Wins!';
//       }
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const result = ai.attackEnemyGameBoard();
//       console.log('Ai turn:', result);
//       updateAttackResult('ai', result);
//       gameState.currentPlayer = p1;
//     }
//   }
// };

const gameLoop = async (p1, ai, attackInput, gameState) => {
  if (gameState.isGameOver) {
    return; // Game is already over, exit the loop.
  }

  if (gameState.currentPlayer === p1) {
    if (isGameOver(p1, ai)) {
      gameState.isGameOver = true;
      console.log(`${p1.name} Wins!`);
      return `${p1.name} Wins!`;
    }

    const result = p1.attackEnemyGameBoard(attackInput);
    console.log(result);
    updateAttackResult(p1.name, result);
    gameState.isAITurn = true; // Set the flag for AI's turn
    gameState.currentPlayer = ai;
  }

  if (gameState.currentPlayer === ai && gameState.isAITurn) {
    if (isGameOver(p1, ai)) {
      gameState.isGameOver = true;
      console.log('Ai Wins!');
      return 'Ai Wins!';
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = ai.attackEnemyGameBoard();
    console.log('Ai turn:', result);
    updateAttackResult('ai', result);
    gameState.isAITurn = false; // Reset the flag for AI's turn
    gameState.currentPlayer = p1;
  }
};

module.exports = gameLoop;
