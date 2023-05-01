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
    // const carrierInput = document.getElementById('carrier').value;
    // const battleshipInput = document.getElementById('battleship').value;
    // const cruiserInput = document.getElementById('cruiser').value;
    // const submarineInput = document.getElementById('submarine').value;
    // const destroyerInput = document.getElementById('destroyer').value;
    const selectedAlignment = document.querySelector('input[name="alignment"]:checked').value;
    // console.log(selectedAlignment);
    const ships = [
      { name: 'carrier', length: 5, inputId: 'carrier' },
      { name: 'battleship', length: 4, inputId: 'battleship' },
      { name: 'cruiser', length: 3, inputId: 'cruiser' },
      { name: 'submarine', length: 3, inputId: 'submarine' },
      { name: 'destroyer', length: 2, inputId: 'destroyer' },
    ];

    ships.forEach((ship) => {
      const input = document.getElementById(ship.inputId);
      if (input.value) {
        const newShip = createShip(ship.name, ship.length);
        const coord = input.value.split(', ').map(Number);
        p1.gameBoard.placeShip(coord, newShip, selectedAlignment);
        showShipsOnBoard(coord, newShip, selectedAlignment);
        console.log(input);
        console.log(input.value);
        console.log(p1.gameBoard.grid);
        input.value = '';
        input.classList.add('hidden');
      }
    });

    // if (carrierInput) {
    //   const carrier = createShip('carrier', 5);
    //   const coord = carrierInput.split(', ').map(Number);
    //   p1.gameBoard.placeShip(coord, carrier, selectedAlignment);
    //   showShipsOnBoard(coord, carrier, selectedAlignment);
    // }

    // if (battleshipInput) {
    //   const battleShip = createShip('battleship', 4);
    // }

    // if (cruiserInput) {
    //   const cruiser = createShip('cruiser', 3);
    // }

    // if (submarineInput) {
    //   const submarine = createShip('Submarine', 3);
    // }

    // if (destroyerInput) {
    //   const destroyer = createShip('destroyer', 2);
    // }
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
