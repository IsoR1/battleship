const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const { updateAttackResult } = require('./mainContent');

// const gameLoop = (p1, ai, attackInput, gameState) => {
//   console.log('this is the game state', gameState);

//   if (!gameState.isGameOver) {
//     console.log(attackInput);
//     if (gameState.currentPlayer === p1) {
//       console.log(p1.gameBoard);
//       const result = p1.attackEnemyGameBoard(attackInput);
//       console.log(result);
//     }
//   }
// };

// const gameLoop = (p1, ai, attackInput, isGameOver, currentPlayer) => {
const gameLoop = (p1, ai, attackInput, gameState) => {
  // const isGameOver = false;
  // const currentPlayer = p1;
  console.log(gameState);

  // if (!isGameOver) {
  if (!gameState.isGameOver) {
    // if (currentPlayer === p1) {
    if (gameState.currentPlayer === p1) {
      if (p1.gameBoard.allShipsSunk()) {
        // isGameOver = true;
        gameState.isGameOver = true;
        return `${p1.name} Wins!`;
      }
      const result = p1.attackEnemyGameBoard(attackInput);
      console.log(result);
      updateAttackResult(p1.name, result);
      // currentPlayer = ai;
      gameState.currentPlayer = ai;
      return ai;
    // } if (currentPlayer === ai) {
    } if (gameState.currentPlayer === ai) {
      if (ai.gameBoard.allShipsSunk()) {
        // isGameOver = true;
        gameState.isGameOver = true;
        return 'Ai Wins!';
      }
      // const result = setTimeout(ai.attackEnemyGameBoard(), 3000);
      const result = ai.attackEnemyGameBoard();
      console.log('Ai turn:', result);
      updateAttackResult('ai', result);
      // currentPlayer = p1;
      gameState.currentPlayer = p1;
    }
  }
};

// const gameLoop = (p1, ai, attackInput) => {
//   let isGameOver = false;
//   let currentPlayer = p1;

//   const aiAttack = () => {
//     const result = ai.attackEnemyGameBoard();
//     console.log('Ai turn:', result);
//     updateAttackResult('ai', result);
//     currentPlayer = p1;
//     if (!ai.gameBoard.allShipsSunk()) {
//       setTimeout(aiAttack, 3000);
//     } else {
//       isGameOver = true;
//       return 'Ai Wins!';
//     }
//   };

//   while (!isGameOver) {
//     if (currentPlayer === p1) {
//       if (p1.gameBoard.allShipsSunk()) {
//         isGameOver = true;
//         return `${p1.name} Wins!`;
//       }
//       const result = p1.attackEnemyGameBoard(attackInput);
//       console.log(result);
//       updateAttackResult(p1.name, result);
//       currentPlayer = ai;
//     } else if (currentPlayer === ai) {
//       setTimeout(aiAttack, 3000);
//       return null;
//     }
//   }
// };

// const createGameLoop = (p1, ai) => {
//   let isGameOver = false;
//   let currentPlayer = p1;

//   const gameLoop = (attackInput) => {
//     if (!isGameOver) {
//       if (currentPlayer === p1) {
//         if (p1.gameBoard.allShipsSunk()) {
//           isGameOver = true;
//           return `${p1.name} Wins!`;
//         }
//         const result = p1.attackEnemyGameBoard(attackInput);
//         console.log(result);
//         updateAttackResult(p1.name, result);
//         currentPlayer = ai;
//         return ai;
//       } if (currentPlayer === ai) {
//         if (ai.gameBoard.allShipsSunk()) {
//           isGameOver = true;
//           return 'Ai Wins!';
//         }
//         // const result = setTimeout(ai.attackEnemyGameBoard(), 3000);
//         const result = ai.attackEnemyGameBoard();
//         console.log('Ai turn:', result);
//         updateAttackResult('ai', result);
//         currentPlayer = p1;
//       }
//     }
//   };
//   return gameLoop;
// };

module.exports = gameLoop;
// module.exports = createGameLoop;
