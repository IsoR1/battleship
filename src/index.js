const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const gameLoop = require('./game');
const {
  renderHeader, createForm, createAttackInstructions, createAttackResultsContainer, updateAttackResult, createMainContent,
} = require('./mainContent');

// const header = renderHeader();
renderHeader();
createForm();
// const nameForm = createForm();
const nameInput = document.getElementById('player-name');
const nameSubmitButton = document.querySelector('.name-button');
const nameFormDiv = document.querySelector('.name-input-div');
const columns = document.querySelectorAll('.col-div');
const p1GameBoard = createGameBoard();
const aiGameBoard = createGameBoard();
let p1;
const ai = createAi(p1GameBoard);
const gameState = {
  isGameOver: false,
  currentPlayer: p1,
  hasGameStarted: false,
  isAiTurn: false,
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
        const placement = ai.gameBoard.placeShip(coord, newShip, selectedAlignment);
        if (placement) {
          input.value = '';
          input.classList.add('hidden');
          numShipsPlaced += 1;
        }
      }
    });

    if (numShipsPlaced === numShips) {
      // AI ship placement
      const aiShips = [
        // { name: 'carrier', length: 5 },
        // { name: 'battleship', length: 4 },
        // { name: 'cruiser', length: 3 },
        // { name: 'submarine', length: 3 },
        { name: 'destroyer', length: 2 },
      ];

      aiShips.forEach((ship) => {
        let isValidPlacement = false;
        let placementCoord;
        let placementAlignment;

        while (!isValidPlacement) {
          const coordRow = Math.floor(Math.random() * p1.gameBoard.grid.length);
          const subArr = p1.gameBoard.grid[coordRow];
          const coordCol = Math.floor(Math.random() * subArr.length);
          const coord = [coordRow, coordCol];
          const options = ['VERTICAL', 'HORIZONTAL'];
          const randomAlignment = options[Math.floor(Math.random() * options.length)];
          console.log(randomAlignment);
          console.log(coord);

          const newShip = createShip(ship.name, ship.length);
          const p1Placement = p1.gameBoard.placeShip(coord, newShip, randomAlignment);

          if (p1Placement) {
            isValidPlacement = true;
            placementCoord = coord;
            placementAlignment = randomAlignment;
          }
        }
        console.log('success:', placementAlignment, placementCoord);
      });
      console.log('ships on board on start', p1.gameBoard.shipsOnBoard);
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
      gameState.hasGameStarted = true;
    }
  }
});

if (!gameState.isGameOver) {
  const clickHandler = (e) => {
    if (e.target.matches('.col-div') && gameState.hasGameStarted && gameState.currentPlayer === p1) {
      const input = [e.target.dataset.rowId, e.target.dataset.colId];
      console.log(input);
      const result = gameLoop(p1, ai, input, gameState);
      console.log('ships on board', p1.gameBoard.shipsOnBoard);
      console.log('ai.gb ships on board', ai.gameBoard.shipsOnBoard);
      console.log(gameState);

      if (gameState.isGameOver) {
        console.log(`Winner: ${gameState.currentPlayer.name}`);
        document.removeEventListener('click', clickHandler);
      }
    }
  };

  document.addEventListener('click', clickHandler);
}

if (gameState.isGameOver) {
  console.log('s');
}
