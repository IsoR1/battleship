const createPlayer = (name, gameBoard) => {
  const player = {
    name,
    gameBoard,
    attackEnemyGameBoard(coord) {
      this.gameBoard.receiveAttack(coord);
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
      this.gameBoard.receiveAttack(coord);
    },
  };
  return ai;
};

module.exports = { createPlayer, createAi };
