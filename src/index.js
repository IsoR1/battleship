const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const {
  renderHeader, createForm, createHitMissText, createMainContent,
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
let numShipsPlaced = 0;
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    p1 = createPlayer(nameInput.value, aiGameBoard);
    console.log(p1);
    p1GameBoard.createGrid();
    aiGameBoard.createGrid();
    nameFormDiv.style.display = 'none';
    createMainContent(p1.gameBoard);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.place-ship-button')) {
    e.preventDefault();

    const selectedAlignment = document.querySelector('input[name="alignment"]:checked').value;

    const ships = [
      { name: 'carrier', length: 5, inputId: 'carrier' },
      { name: 'battleship', length: 4, inputId: 'battleship' },
      { name: 'cruiser', length: 3, inputId: 'cruiser' },
      { name: 'submarine', length: 3, inputId: 'submarine' },
      { name: 'destroyer', length: 2, inputId: 'destroyer' },
    ];
    const numShips = ships.length;

    ships.forEach((ship) => {
      const input = document.getElementById(ship.inputId);
      if (input.value) {
        const newShip = createShip(ship.name, ship.length);
        const coord = input.value.split(', ').map(Number);
        p1.gameBoard.placeShip(coord, newShip, selectedAlignment);
        // showShipsOnBoard(coord, newShip, selectedAlignment);
        input.value = '';
        input.classList.add('hidden');
        numShipsPlaced += 1;
      }
    });

    if (numShipsPlaced === numShips) {
      const hitMissDiv = createHitMissText();
      const underHeaderDiv = document.querySelector('.main-body-div');
      const gameBoardDiv = document.querySelector('.game-board-div');
      const shipPlacementContainer = document.querySelector('.ship-placement-container');
      shipPlacementContainer.remove();
      underHeaderDiv.insertBefore(hitMissDiv, underHeaderDiv.firstChild);
      underHeaderDiv.style.flexDirection = 'column';
      gameBoardDiv.style.justifyContent = 'center';
      gameBoardDiv.style.alignItems = 'center';
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.col-div')) {
    const input = [e.target.dataset.colId, e.target.dataset.rowId];
    console.log(input);
    console.log(p1.attackEnemyGameBoard(input));
  }
});
