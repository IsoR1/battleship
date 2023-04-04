const createGameBoard = () => {
    const board = {
        grid: [],

        createGrid() {
            for (let i = 0; i < 10; i++) {
                let row = [];
                for (let j = 0; j < 10; j++) {
                    row.push("");
                }
                this.grid.push(row)
            }
        }
    }
    return board
}

module.exports = createGameBoard