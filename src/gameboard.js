const createGameBoard = () => {
  const board = {
    grid: [],
    missedShots: [],
    shipsOnBoard: [],

    createGrid() {
      for (let i = 0; i < 10; i += 1) {
        const row = [];
        for (let j = 0; j < 10; j += 1) {
          row.push('');
        }
        this.grid.push(row);
      }
    },
    placeShip(coord, ship, alignment) {
      if (!alignment) {
        throw new Error('Alignment is required to place a ship');
      }
      const upperAlignment = alignment.toUpperCase();
      if (upperAlignment === 'VERTICAL') {
        const endRow = coord[0] + ship.length - 1;
        for (let i = coord[0]; i <= endRow; i += 1) {
          this.grid[i][coord[1]] = ship;
        }
      } else if (upperAlignment === 'HORIZONTAL') {
        const endCol = coord[1] + ship.length - 1;
        for (let i = coord[1]; i <= endCol; i += 1) {
          this.grid[coord[0]][i] = ship;
        }
      }
      this.shipsOnBoard.push(ship);
    },
    receiveAttack(coord) {
      const targetedShip = this.grid[coord[0]][coord[1]];
      if (typeof targetedShip === 'object') {
        targetedShip.hit();
        if (targetedShip.isSunk()) {
          const sunkShipIndex = this.shipsOnBoard.indexOf(targetedShip);
          this.shipsOnBoard.splice(sunkShipIndex, 1);
        }
      } else {
        this.missedShots.push(coord);
        console.log('You missed!', this.missedShots);
      }
    },
    allShipsSunk() {
      return this.shipsOnBoard.length === 0;
    },
  };
  return board;
};

module.exports = createGameBoard;
