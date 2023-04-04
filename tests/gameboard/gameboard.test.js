const createGameBoard = require("../../src/gameboard")
const gameboard = require("../../src/gameboard")

test("gameboard array length should be 10", () => {
    const gb = createGameBoard();
    gb.createGrid()
    expect(gb.grid).toHaveLength(10)
})