function createShip(length) {
  const ship = {
    length,
    hits: 0,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.hits >= this.length;
    },
  };
  return ship;
}

// let shipOne = createShip(2)

module.exports = createShip;
