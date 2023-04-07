const createShip = require('./ship');
const createGameBoard = require('./gameboard');

const ship = createShip(3);
const gb = createGameBoard();
gb.createGrid();
// gb.placeShip([0, 0], ship, 'vertical');
gb.placeShip([0, 0], ship, 'horizontal');

const formatGrid = (grid) => {
  const formattedRows = grid.map((row) => row
    .map((cell) => (cell === '' ? 'O' : 'X')) // replace empty cells with "O", and ships with "X"
    .join(' '), // join the cells with spaces
  );
  const formattedGrid = formattedRows.join('\n'); // join the rows with newlines
  console.log(formattedGrid);
};
// formatGrid(gb.grid);
gb.receiveAttack([0, 7]);
gb.receiveAttack([0, 6]);
// console.log(ship.hits);
