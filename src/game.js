const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const { updateAttackResult } = require('./mainContent');

const gameLoop = (p1, ai, attackInput, gameState) => {
  if (!gameState.isGameOver) {
    if (gameState.currentPlayer === p1) {
      if (p1.gameBoard.allShipsSunk()) {
        gameState.isGameOver = true;
        console.log(`${p1.name} Wins!`);
        return `${p1.name} Wins!`;
      }
      const result = p1.attackEnemyGameBoard(attackInput);
      console.log(result);
      updateAttackResult(p1.name, result);
      gameState.currentPlayer = ai;
    }
    if (gameState.currentPlayer === ai) {
      if (ai.gameBoard.allShipsSunk()) {
        gameState.isGameOver = true;
        console.log('Ai Wins!');
        return 'Ai Wins!';
      }
      // const result = setTimeout(ai.attackEnemyGameBoard, 3000);
      setTimeout(() => console.log('hello'), 5000);
      // setTimeout(() => ai.attackEnemyGameBoard, 5000);
      setTimeout(() => {
        const result = ai.attackEnemyGameBoard();
        console.log('Ai turn:', result);
        updateAttackResult('ai', result);
        gameState.currentPlayer = p1;
      }, 2000);
      // const result = ai.attackEnemyGameBoard();
    }
  }
};

module.exports = gameLoop;
