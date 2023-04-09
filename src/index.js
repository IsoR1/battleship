const createShip = require('./ship');
const createGameBoard = require('./gameboard');

const ship = createShip('submarine', 3);
const gb = createGameBoard();

gb.createGrid();
