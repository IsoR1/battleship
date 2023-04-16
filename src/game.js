const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');

const gameLoop = (playerOneName) => {
  const p1GameBoard = createGameBoard();
  p1GameBoard.createGrid();
  const aiGameBoard = createGameBoard();
  aiGameBoard.createGrid();
  const p1 = createPlayer(playerOneName, aiGameBoard);
  const ai = createAi(p1GameBoard);

  const p1Carrier = createShip('Carrier', 5);
  const p1BattleShip = createShip('Battleship', 4);
  const p1Cruiser = createShip('Cruiser', 3);
  const p1Sub = createShip('Submarine', 3);
  const p1Destroyer = createShip('Destroyer', 2);
  p1GameBoard.placeShip([1, 1], p1Carrier, 'horizontal');
  p1GameBoard.placeShip([0, 0], p1BattleShip, 'vertical');
  p1GameBoard.placeShip([0, 1], p1Cruiser, 'horizontal');
  p1GameBoard.placeShip([6, 4], p1Sub, 'horizontal');
  p1GameBoard.placeShip([9, 3], p1Destroyer, 'horizontal');

  const aiCarrier = createShip('Carrier', 5);
  const aiBattleShip = createShip('Battleship', 4);
  const aiCruiser = createShip('Cruiser', 3);
  const aiSub = createShip('Submarine', 3);
  const aiDestroyer = createShip('Destroyer', 2);
  aiGameBoard.placeShip([1, 1], aiCarrier, 'horizontal');
  aiGameBoard.placeShip([9, 4], aiBattleShip, 'horizontal');
  aiGameBoard.placeShip([4, 5], aiCruiser, 'horizontal');
  aiGameBoard.placeShip([2, 2], aiSub, 'horizontal');
  aiGameBoard.placeShip([0, 0], aiDestroyer, 'vertical');

  let isGameOver = false;
  let currentPlayer = p1;

  while (!isGameOver) {
    if (currentPlayer === p1) {
      if (p1.gameBoard.allShipsSunk()) {
        isGameOver = true;
        return `${playerOneName} Wins!`;
      }
      const input = prompt('What position would you like to hit? ');
      const coord = input.split(',').map((num) => parseInt(num.trim()));
      const result = p1.attackEnemyGameBoard(coord);
      console.log(`${playerOneName}'s turn:, ${result}`);
      currentPlayer = ai;
    } else if (currentPlayer === ai) {
      if (ai.gameBoard.allShipsSunk()) {
        isGameOver = true;
        return 'Ai Wins!';
      }
      const result = ai.attackEnemyGameBoard();
      console.log('Ai turn:', result);
      currentPlayer = p1;
    }
  }
};

module.exports = gameLoop;
