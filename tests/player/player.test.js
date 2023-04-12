const { createPlayer, createAi } = require('../../src/player');
const createGameBoard = require('../../src/gameboard');
const createShip = require('../../src/ship');

describe('createPlayer', () => {
  let player;
  let gameBoard;
  let ship;

  beforeEach(() => {
    gameBoard = createGameBoard();
    gameBoard.createGrid();
    player = createPlayer('Test', gameBoard);
    ship = createShip('Submarine', 3);
    gameBoard.placeShip([3, 3], ship, 'horizontal');
  });

  test('Player should be able to attack ship', () => {
    player.attackEnemyGameBoard([3, 3]);

    expect(gameBoard.grid[3][3].hits).toBe(1);
  });
});

describe('Two Players playing against each other', () => {
  let pOne;
  let pTwo;
  let pOneGB;
  let pTwoGB;
  let pOneShip;
  let pTwoShip;

  beforeEach(() => {
    pOneGB = createGameBoard();
    pOneGB.createGrid();
    pTwoGB = createGameBoard();
    pTwoGB.createGrid();
    pOneShip = createShip('Carrier', 5);
    pTwoShip = createShip('Submarine', 3);
    pOne = createPlayer('Player One,', pTwoGB);
    pTwo = createPlayer('Player Two', pOneGB);
    pOneGB.placeShip([4, 3], pOneShip, 'horizontal');
    pTwoGB.placeShip([2, 7], pTwoShip, 'vertical');
  });
  test("Player One should be able to attack Player Two's GB", () => {
    pOne.attackEnemyGameBoard([2, 7]);
    pOne.attackEnemyGameBoard([2, 7]);

    expect(pTwoGB.grid[2][7].hits).toBe(2);
  });
  test("Player Two should be able to sink Player One's ship", () => {
    pTwo.attackEnemyGameBoard([4, 3]);
    pTwo.attackEnemyGameBoard([4, 3]);
    pTwo.attackEnemyGameBoard([4, 3]);
    pTwo.attackEnemyGameBoard([4, 3]);
    pTwo.attackEnemyGameBoard([4, 3]);

    expect(pOneGB.allShipsSunk()).toBe(true);
  });
});
