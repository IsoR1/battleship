const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const createMainContent = require('./mainContent');

// const ship = createShip('submarine', 3);
// const gb = createGameBoard();
// const ai = createAi(gb);
console.log(gameLoop('Jeff'));
createMainContent();
