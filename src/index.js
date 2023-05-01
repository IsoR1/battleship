const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const {
  renderHeader, createForm, showShipsOnBoard, createMainContent,
} = require('./mainContent');

const header = renderHeader();
const nameForm = createForm();
const nameInput = document.getElementById('player-name');
const nameSubmitButton = document.querySelector('.name-button');
const nameFormDiv = document.querySelector('.name-input-div');
const columns = document.querySelectorAll('.col-div');
const p1GameBoard = createGameBoard();
const aiGameBoard = createGameBoard();
let p1;
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    p1 = createPlayer(nameInput.value, aiGameBoard);
    console.log(p1);
    p1GameBoard.createGrid();
    aiGameBoard.createGrid();
    nameFormDiv.style.display = 'none';
    createMainContent(p1.gameBoard);
    console.log(nameInput);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.place-ship-button')) {
    e.preventDefault();
    const carrierInput = document.getElementById('carrier').value;
    const battleshipInput = document.getElementById('battleship').value;
    const cruiserInput = document.getElementById('cruiser').value;
    const submarineInput = document.getElementById('submarine').value;
    const destroyerInput = document.getElementById('destroyer').value;
    const selectedAlignment = document.querySelector('input[name="alignment"]:checked').value;
    // console.log(selectedAlignment);

    if (carrierInput) {
      const carrier = createShip('carrier', 5);
      const coord = carrierInput.split(', ').map(Number);
      // console.log(carrierInput.split(', ').map(Number));
      p1.gameBoard.placeShip(coord, carrier, selectedAlignment);
      // p1.gameBoard.placeShip(carrierInput, carrier, selectedAlignment);
      // console.log(p1.gameBoard.placeShip(carrierInput, carrier, selectedAlignment));
      // console.log(p1GameBoard.placeShip(carrierInput, carrier, selectedAlignment));
      // console.log(p1.gameBoard.grid);
      // console.log(p1.gameBoard.placeShip([2, 2], 'carrier', 'horizontal'));
      // p1.gameBoard.placeShip([2, 2], carrier, 'horizontal');
      // console.log(p1.gameBoard.grid);
      // console.log(p1GameBoard.grid);
      showShipsOnBoard(coord, carrier, selectedAlignment);
    }

    if (battleshipInput) {
      const battleShip = createShip('battleship', 4);
    }

    if (cruiserInput) {
      const cruiser = createShip('cruiser', 3);
    }

    if (submarineInput) {
      const submarine = createShip('Submarine', 3);
    }

    if (destroyerInput) {
      const destroyer = createShip('destroyer', 2);
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.col-div')) {
    // console.log(e.target.dataset.colId);
    // console.log(e.target.dataset.rowId);
    // console.log(p1.gameBoard.grid[e.target.dataset.rowId][e.target.dataset.colId]);
    // p1.attackEnemyGameBoard(e.target);
    // p1GameBoard.grid[e.target.dataset.colId][e.target.dataset.rowId] = 's';
    // console.log(p1GameBoard.grid[e.target.dataset.colId][e.target.dataset.rowId]);
    const input = [e.target.dataset.colId, e.target.dataset.rowId];
    console.log(input);
    console.log(p1.attackEnemyGameBoard(input));
  }
});

// ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
