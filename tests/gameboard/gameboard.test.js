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
    ship = createShip('Submarine', 3);
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

  test('shipsOnBoard should be updated every time a ship is placed', () => {
    gameBoard.placeShip([1, 3], ship, 'horizontal');

    expect(gameBoard.shipsOnBoard[0]).toMatchObject(ship);
  });
});

describe('receiveAttack', () => {
  let ship;
  let gameBoard;

  beforeEach(() => {
    ship = createShip('Submarine', 3);
    gameBoard = createGameBoard();
    gameBoard.createGrid();
    gameBoard.placeShip([0, 0], ship, 'vertical');
  });

  test('calling receiveAttack on occupied pos should increase hit count on that ship', () => {
    gameBoard.receiveAttack([0, 0]);

    expect(gameBoard.grid[0][0].hits).toBe(1);
  });
  test('calling receiveAttack on occupied pos should increase hit count on that ship', () => {
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 0]);

    expect(gameBoard.grid[0][0].hits).toBe(3);
  });

  test('calling receiveAttack when a ship is sunk should remove that ship from the shipsOnBoard array', () => {
    const carrierShip = createShip('Carrier', 5);
    gameBoard.placeShip([5, 5], carrierShip, 'horizontal');
    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([5, 5]);

    expect(gameBoard.shipsOnBoard.length).toEqual(1);
  });
});
