const createPlayer = (name, gameBoard) => {
  const player = {
    name,
    gameBoard,
    attackEnemyGameBoard(coord) {
      return this.gameBoard.receiveAttack(coord);
    },
  };
  return player;
};

const createAi = (gameBoard) => {
  const ai = {
    gameBoard,
    attackEnemyGameBoard() {
      const coordRow = Math.floor(Math.random() * gameBoard.grid.length);
      const subArr = gameBoard.grid[coordRow];
      const coordCol = Math.floor(Math.random() * subArr.length);
      const coord = [coordRow, coordCol];
      const coordHit = gameBoard.missedShots.some((el) => coord[0] === el[0] && coord[1] === el[1]);
      if (!coordHit) {
        return this.gameBoard.receiveAttack(coord);
      }
      return 'Position has already been hit';
    },
  };
  return ai;
};

module.exports = { createPlayer, createAi };
