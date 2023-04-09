function createShip(name, length) {
  const ship = {
    name,
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

module.exports = createShip;
