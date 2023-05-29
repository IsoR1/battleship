const isGameOver = (p1, ai) => {
  if (p1.gameBoard.allShipsSunk()) {
    console.log(`${p1.name} wins`);
    return true;
  }

  if (ai.gameBoard.allShipsSunk()) {
    console.log('Ai wins');
    return true;
  }

  return false;
};

module.exports = { isGameOver };
