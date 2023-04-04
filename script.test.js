const createShip = require("./script")

test("creates a ship with a length of 4", () => {
    expect(createShip(4)).toMatchObject({
        length: 4,
        hits: 0,
        hit: expect.any(Function),
        isSunk: expect.any(Function),
    })
})