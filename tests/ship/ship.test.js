const createShip = require('../../src/ship');

test('creates a ship with a length of 4', () => {
  expect(createShip('Battleship', 4)).toMatchObject({
    length: 4,
    hits: 0,
    hit: expect.any(Function),
    isSunk: expect.any(Function),
  });
});

test("calling hit on a ship increases it's hits counter", () => {
  const ship = createShip('Battleship', 4);

  ship.hit();
  expect(ship.hits).toBe(1);
});

test('calling isSunk on a ship with 3 hits should return true', () => {
  const ship = createShip('Submarine', 3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toEqual(true);
});
