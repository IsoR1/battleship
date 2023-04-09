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

module.exports = createPlayer;
