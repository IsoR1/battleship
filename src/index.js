const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const { renderHeader, createForm, createMainContent } = require('./mainContent');

const header = renderHeader();
const nameForm = createForm();
const nameInput = document.getElementById('player-name');
const nameSubmitButton = document.querySelector('.name-button');
const nameFormDiv = document.querySelector('.name-input-div');
const columns = document.querySelectorAll('.col-div');
const p1GameBoard = createGameBoard();
const aiGameBoard = createGameBoard();
const p1 = createPlayer(nameInput.value, aiGameBoard);
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    p1GameBoard.createGrid();
    aiGameBoard.createGrid();
    nameFormDiv.style.display = 'none';
    createMainContent(p1.gameBoard);
    console.log(nameInput);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.col-div')) {
    console.log(e.target.dataset.colId);
    console.log(e.target.dataset.rowId);
    console.log(p1.gameBoard.grid[e.target.dataset.rowId][e.target.dataset.colId]);
  }
});
