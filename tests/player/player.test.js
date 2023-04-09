const { describe } = require('yargs');
const createPlayer = require('../../src/player');
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
