const createShip = require('../../src/ship');

test('creates a ship with a length of 4', () => {
  expect(createShip(4)).toMatchObject({
    length: 4,
    hits: 0,
    hit: expect.any(Function),
    isSunk: expect.any(Function),
  });
});

test("calling hit on a ship increases it's hits counter", () => {
  const ship = createShip(4);

  ship.hit();
  expect(ship.hits).toBe(1);
});
