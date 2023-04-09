const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const createPlayer = require('./player');

const ship = createShip('submarine', 3);
const gb = createGameBoard();

gb.createGrid();
