const createGameBoard = () => {
  const board = {
    grid: [],
    missedShots: [],

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
    },
    receiveAttack(coord) {
      if (typeof this.grid[coord[0]][coord[1]] === 'object') {
        this.grid[coord[0]][coord[1]].hit();
      } else {
        this.missedShots.push(coord);
        console.log('You missed!', this.missedShots);
      }
    },
  };
  return board;
};

module.exports = createGameBoard;
