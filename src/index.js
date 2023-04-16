const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const { renderHeader, createForm, createMainContent } = require('./mainContent');

// const ship = createShip('submarine', 3);
// const gb = createGameBoard();
// const ai = createAi(gb);
const header = renderHeader();
const nameForm = createForm();
const nameInput = document.getElementById('player-name');
const aiGameBoard = createGameBoard();
const nameSubmitButton = document.querySelector('.name-button');
const nameFormDiv = document.querySelector('.name-input-div');
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    const p1GameBoard = createGameBoard();
    const aiGameBoard = createGameBoard();
    const p1 = createPlayer(nameInput.value, aiGameBoard);
    // nameFormDiv.classList.add('hidden');
    nameFormDiv.style.display = 'none';
    // createMainContent(p1);
    // const p1GameBoard = createGameBoard();
    // const aiGameBoard = createGameBoard();
    // const p1 = createPlayer(nameInput.value, aiGameBoard);
    // console.log(gameLoop(p1, p1GameBoard, aiGameBoard));
    console.log(nameInput);
  }
});
