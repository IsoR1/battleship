const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const {
  renderHeader, createForm, createAttackInstructions, createAttackResultsContainer, updateAttackResult, createMainContent,
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
const ai = createAi(p1GameBoard);
// eslint-disable-next-line prefer-const
// let isGameOver = false;
// eslint-disable-next-line prefer-const
// let currentPlayer = p1;
const gameState = {
  isGameOver: false,
  currentPlayer: p1,
};
let numShipsPlaced = 0;
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    p1 = createPlayer(nameInput.value, aiGameBoard);
    gameState.currentPlayer = p1;
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
        ai.gameBoard.placeShip(coord, newShip, selectedAlignment);
        // ai.gameBoard.placeShip(coord, newShip, selectedAlignment);
        // p1GameBoard.placeShip(coord, newShip, selectedAlignment);
        // console.log(p1.gameBoard);
        // console.log(p1GameBoard);
        // p1.gameBoard.placeShip(coord, newShip, selectedAlignment);
        input.value = '';
        input.classList.add('hidden');
        numShipsPlaced += 1;
      }
    });

    if (numShipsPlaced === numShips) {
      // AI ship placement
      const aiShips = [
        { name: 'carrier', length: 5 },
        { name: 'battleship', length: 4 },
        { name: 'cruiser', length: 3 },
        { name: 'submarine', length: 3 },
        { name: 'destroyer', length: 2 },
      ];

      aiShips.forEach((ship) => {
        const coordRow = Math.floor(Math.random() * p1.gameBoard.grid.length);
        const subArr = p1.gameBoard.grid[coordRow];
        const coordCol = Math.floor(Math.random() * subArr.length);
        const coord = [coordRow, coordCol];
        const options = ['VERTICAL', 'HORIZONTAL'];
        const randomAlignment = options[Math.floor(Math.random() * options.length)];
        console.log(randomAlignment);
        console.log(coord);
        p1.gameBoard.placeShip(coord, ship, randomAlignment);
      });

      const attackInstructions = createAttackInstructions();
      const hitMissDivCon = createAttackResultsContainer();
      const underHeaderDiv = document.querySelector('.main-body-div');
      const gameBoardDiv = document.querySelector('.game-board-div');
      const shipPlacementContainer = document.querySelector('.ship-placement-container');
      shipPlacementContainer.remove();
      underHeaderDiv.insertBefore(attackInstructions, underHeaderDiv.firstChild);
      underHeaderDiv.insertBefore(hitMissDivCon, underHeaderDiv.children[1]);
      underHeaderDiv.style.flexDirection = 'column';
      gameBoardDiv.style.justifyContent = 'center';
      gameBoardDiv.style.alignItems = 'center';
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.col-div')) {
    // const input = [e.target.dataset.colId, e.target.dataset.rowId];
    const input = [e.target.dataset.rowId, e.target.dataset.colId];
    console.log(input);
    // const res = gameLoop(p1, ai, input);
    // createGameLoop(p1, ai)(input);
    // console.log(gameLoop(p1, ai, input, isGameOver, currentPlayer));
    gameLoop(p1, ai, input, gameState);
    // console.log(p1.gameBoard);
    console.log(p1);
    // console.log(ai.gameBoard);
  }
});

// const coordRow = Math.floor(Math.random() * gameBoard.grid.length);
// const subArr = gameBoard.grid[coordRow];
// const coordCol = Math.floor(Math.random() * subArr.length);
// const coord = [coordRow, coordCol];
