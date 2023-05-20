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

      let isValidPosition = false;
      let attempts = 0;
      const maxAttempts = 1000;
      while (!isValidPosition && attempts <= maxAttempts) {
        isValidPosition = true;

        if (upperAlignment === 'VERTICAL') {
          const endRow = coord[0] + ship.length - 1;
          if (endRow >= this.grid.length) {
            attempts += 1;
            continue; // Try a different position
          }
          for (let i = coord[0]; i <= endRow; i += 1) {
            if (!this.grid[i] || this.grid[i][coord[1]] !== '') {
              isValidPosition = false;
              attempts += 1;
              break;
            }
          }
          if (isValidPosition) {
            for (let i = coord[0]; i <= endRow; i += 1) {
              this.grid[i][coord[1]] = ship;
            }
          }
        } else if (upperAlignment === 'HORIZONTAL') {
          const endCol = coord[1] + ship.length - 1;
          if (endCol >= this.grid[coord[0]].length) {
            attempts += 1;
            continue; // Try a different position
          }
          for (let i = coord[1]; i <= endCol; i += 1) {
            if (!this.grid[coord[0]] || this.grid[coord[0]][i] !== '') {
              isValidPosition = false;
              attempts += 1;
              break;
            }
          }
          if (isValidPosition) {
            for (let i = coord[1]; i <= endCol; i += 1) {
              this.grid[coord[0]][i] = ship;
            }
          }
        }
      }

      if (attempts === maxAttempts) {
        throw new Error('Unable to place the ship in a valid position');
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
          return `sunk a ${targetedShip.name}!`;
        }
        return 'Hit!';
      }
      this.missedShots.push([coord[0], coord[1]]);
      return ('Miss!');
    },
    allShipsSunk() {
      return this.shipsOnBoard.length === 0;
    },
  };
  return board;
};

module.exports = createGameBoard;
