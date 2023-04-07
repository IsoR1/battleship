const { describe } = require('yargs');
const createGameBoard = require('../../src/gameboard');
const createShip = require('../../src/ship');

test('gameboard array length should be 10', () => {
  const gb = createGameBoard();
  gb.createGrid();
  expect(gb.grid).toHaveLength(10);
});

describe('placeShip', () => {
  let ship;
  let gameBoard;

  beforeEach(() => {
    ship = createShip(3);
    gameBoard = createGameBoard();
    gameBoard.createGrid();
  });

  test('should place the ship vertically at the correct positions', () => {
    gameBoard.placeShip([0, 0], ship, 'vertical');

    expect(gameBoard.grid[0][0]).toEqual(ship);
    expect(gameBoard.grid[1][0]).toEqual(ship);
    expect(gameBoard.grid[2][0]).toEqual(ship);
  });

  test('should place the ship horizontally at the correct position', () => {
    gameBoard.placeShip([1, 3], ship, 'horizontal');

    expect(gameBoard.grid[1][3]).toEqual(ship);
    expect(gameBoard.grid[1][4]).toEqual(ship);
    expect(gameBoard.grid[1][5]).toEqual(ship);
  });
});
