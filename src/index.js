const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const createMainContent = require('./mainContent');

// const ship = createShip('submarine', 3);
// const gb = createGameBoard();
// const ai = createAi(gb);
createMainContent();
const nameInput = document.getElementById('player-name');
const nameSubmitButton = document.querySelector('.name-button');
nameSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (nameInput) {
    console.log(gameLoop(nameInput.value));
  }
});
