const { createAi } = require('../../src/player');
const createGameBoard = require('../../src/gameboard');

describe('createAi', () => {
  let ai;
  let gameBoard;
  beforeEach(() => {
    gameBoard = createGameBoard();
    gameBoard.createGrid();
    ai = createAi(gameBoard);
  });

  test('Ai should attack random position and if it misses should push to missedShots array', () => {
    ai.attackEnemyGameBoard();
    ai.attackEnemyGameBoard();
    ai.attackEnemyGameBoard();

    expect(gameBoard.missedShots.length).toBe(3);
  });

  test('Position that has been hit should not be hit again', () => {
    // gameBoard.missedShots
    for (let i = 0; i < gameBoard.grid.length; i += 1) {
      for (let j = 0; j < gameBoard.grid[i].length; j += 1) {
        gameBoard.missedShots.push([i, j]);
      }
    }
    expect(() => ai.attackEnemyGameBoard()).toThrow('Position has already been hit');
  });
});
