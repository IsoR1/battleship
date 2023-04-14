// const createShip = require('./ship');

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
    p1GameBoard.placeShip([1, 1], p1Carrier, "horizontal");
    p1GameBoard.placeShip([0, 0], p1BattleShip, "vertical")
    p1GameBoard.placeShip([], ,)
    p1GameBoard.placeShip([], ,)
    p1GameBoard.placeShip([], ,)

    const aiCarrier = createShip('Carrier', 5);
    const aiBattleShip = createShip('Battleship', 4);
    const aiCruiser = createShip('Cruiser', 3);
    const aiSub = createShip('Submarine', 3);
    const aiDestroyer = createShip('Destroyer', 2);
    p1GameBoard.placeShip([1, 1], p1Carrier, "horizontal");
    p1GameBoard.placeShip([], ,)
    p1GameBoard.placeShip([], ,)
    p1GameBoard.placeShip([], ,)
    p1GameBoard.placeShip([], ,)
};


// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question('What is your name? ', (name) => {
//   console.log(`Hello ${name}!`);
//   readline.close();
// });

// module.exports = gameLoop;
