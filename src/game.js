const createShip = require('./ship');
const createGameBoard = require('./gameboard');
const { createPlayer, createAi } = require('./player');
const {
  renderHeader, createForm, createAttackInstructions, createAttackResultsContainer, updateAttackResult, winningMessage, removeH2Div, createMainContent,
} = require('./mainContent');

// // const gameLoop = async (p1, ai, attackInput, gameState) => {
// //   if (!gameState.isGameOver) {
// //     if (gameState.currentPlayer === p1) {
// //       if (p1.gameBoard.allShipsSunk()) {
// //         gameState.isGameOver = true;
// //         console.log(`${p1.name} Wins!`);
// //         return `${p1.name} Wins!`;
// //       }
// //       const result = p1.attackEnemyGameBoard(attackInput);
// //       console.log(result);
// //       updateAttackResult(p1.name, result);
// //       gameState.currentPlayer = ai;
// //     }
// //     if (gameState.currentPlayer === ai) {
// //       if (ai.gameBoard.allShipsSunk()) {
// //         gameState.isGameOver = true;
// //         console.log('Ai Wins!');
// //         return 'Ai Wins!';
// //       }
// //       await new Promise((resolve) => setTimeout(resolve, 2000));

// //       const result = ai.attackEnemyGameBoard();
// //       console.log('Ai turn:', result);
// //       updateAttackResult('ai', result);
// //       gameState.currentPlayer = p1;
// //     }
// //   }
// // };
// const gameState = {
//   isGameOver: false,
//   currentPlayer: p1,
//   hasGameStarted: false,
//   isAiTurn: false,
// };

// const checkWinner = (p1, ai, gameState) => {
//   if (p1.gameBoard.allShipsSunk() && ai.gameBoard.allShipsSunk()) {
//     endGame(0, gameState);
//   }

//   if (p1.gameBoard.allShipsSunk()) {
//     const winner = endGame(p1.name, gameState);
//     console.log(winner);
//     return;
//   }

//   if (ai.gameBoard.allShipsSunk()) {
//     endGame(ai, gameState);
//   }
// };

// const gameLoop = async (p1, ai, attackInput, gameState) => {
//   // if (gameOver(p1, ai)) {
//   //   gameState.isGameOver = true;
//   //   // console.log('Ai Wins!');
//   //   // return 'Ai Wins!';
//   // }
//   // if (p1.gameBoard.allShipsSunk() && ai.gameBoard.allShipsSunk()) {
//   //   endGame(0, gameState);
//   // }

//   // if (p1.gameBoard.allShipsSunk()) {
//   //   const winner = endGame(p1.name, gameState);
//   //   console.log(winner);
//   //   return;
//   // }

//   // if (ai.gameBoard.allShipsSunk()) {
//   //   endGame(ai, gameState);
//   // }

//   const result = p1.attackEnemyGameBoard(attackInput);
//   console.log(result);
//   // updateAttackResult(p1.name, result);
//   gameState.isAITurn = true; // Set the flag for AI's turn
//   gameState.currentPlayer = ai;
//   // }

//   if (gameState.currentPlayer === ai && gameState.isAITurn) {
//     // if (isGameOver(p1, ai)) {
//     //   gameState.isGameOver = true;
//     //   console.log('Ai Wins!');
//     //   return 'Ai Wins!';
//     // }

//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     const result = ai.attackEnemyGameBoard();
//     console.log('Ai turn:', result);
//     // updateAttackResult('ai', result);
//     gameState.isAITurn = false; // Reset the flag for AI's turn
//     gameState.currentPlayer = p1;

//     // checkWinner(p1, ai, gameState);
//   }
// };

// module.exports = { checkWinner, gameLoop };

const createGame = () => {
  const game = {
    p1: null,
    ai: null,
    gameState: {
      isGameOver: false,
      currentPlayer: null,
      hasGameStarted: false,
      isAITurn: false,
      numShipsPlaced: 0,
    },
    ships: [
      { name: 'carrier', length: 5, inputId: 'carrier' },
      { name: 'battleship', length: 4, inputId: 'battleship' },
      { name: 'cruiser', length: 3, inputId: 'cruiser' },
      { name: 'submarine', length: 3, inputId: 'submarine' },
      { name: 'destroyer', length: 2, inputId: 'destroyer' },
    ],
    handleNameSubmit(name) {
      const p1GameBoard = createGameBoard();
      const aiGameBoard = createGameBoard();
      p1GameBoard.createGrid();
      aiGameBoard.createGrid();
      this.p1 = createPlayer(name, aiGameBoard);
      this.ai = createAi(p1GameBoard);
      console.log(this.p1);
    },
    startGame() {
      this.gameState.currentPlayer = this.p1;
      this.gameState.hasGameStarted = true;
    },

    placeShipsFromPlayerInput() {
      const selectedAlignment = document.querySelector('input[name="alignment"]:checked').value;

      // const ships = [
      //   { name: 'carrier', length: 5, inputId: 'carrier' },
      //   { name: 'battleship', length: 4, inputId: 'battleship' },
      //   { name: 'cruiser', length: 3, inputId: 'cruiser' },
      //   { name: 'submarine', length: 3, inputId: 'submarine' },
      //   { name: 'destroyer', length: 2, inputId: 'destroyer' },
      // ];
      const numShips = this.ships.length;

      this.ships.forEach((ship) => {
        const input = document.getElementById(ship.inputId);
        if (input.value) {
          const newShip = createShip(ship.name, ship.length);
          const coord = input.value.split(', ').map(Number);
          const placement = this.ai.gameBoard.placeShip(coord, newShip, selectedAlignment);
          if (placement) {
            input.value = '';
            input.classList.add('hidden');
            this.gameState.numShipsPlaced += 1;
          }
        }
      });
      if (this.gameState.numShipsPlaced === numShips) {
        this.placeAiShips();
        this.startGame();
        console.log(this.ai.gameBoard.grid);
      }
    },
    placeAiShips() {
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
          const coordRow = Math.floor(Math.random() * this.p1.gameBoard.grid.length);
          const subArr = this.p1.gameBoard.grid[coordRow];
          const coordCol = Math.floor(Math.random() * subArr.length);
          const coord = [coordRow, coordCol];
          const options = ['VERTICAL', 'HORIZONTAL'];
          const randomAlignment = options[Math.floor(Math.random() * options.length)];
          console.log(randomAlignment);
          console.log(coord);

          const newShip = createShip(ship.name, ship.length);
          const p1Placement = this.p1.gameBoard.placeShip(coord, newShip, randomAlignment);

          if (p1Placement) {
            isValidPlacement = true;
            placementCoord = coord;
            placementAlignment = randomAlignment;
          }
        }
        console.log('success:', placementAlignment, placementCoord);
      });
      console.log('ships on board on start', this.p1.gameBoard.shipsOnBoard);
      this.gameState.hasGameStarted = true;
      this.setupGameUi();
    },
    setupGameUi() {
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
    },
    endGame(winner) {
      this.gameState.isGameOver = true;

      if (winner === 0) {
        winningMessage(winner);
        return 'Tie';
      }
      console.log(`Player ${winner} wins!`);
      winningMessage(winner);
      removeH2Div();
      return `Player ${winner} wins!`;
    },
    aiAttack() {
      const result = this.ai.attackEnemyGameBoard();
      console.log('Ai turn:', result);
      updateAttackResult('ai', result);
      this.gameState.isAITurn = false; // Reset the flag for AI's turn
      this.gameState.currentPlayer = this.p1;
    },
    playerAttack(attackInput) {
      const result = this.p1.attackEnemyGameBoard(attackInput);
      console.log(result);
      updateAttackResult(this.p1.name, result);
      this.gameState.isAITurn = true; // Set the flag for AI's turn
      this.gameState.currentPlayer = this.ai;
      return result;
    },
    attackLoop(input) {
      // if (!this.gameState.isGameOver) {
      if (this.gameState.currentPlayer === this.p1) {
        const attack = this.playerAttack(input);
        const aiAttack = this.aiAttack();
      }

      if (this.p1.gameBoard.allShipsSunk() && this.ai.gameBoard.allShipsSunk()) {
        this.endGame(0);
      } else if (this.p1.gameBoard.allShipsSunk()) {
        this.endGame(this.p1.name);
      } else if (this.ai.gameBoard.allShipsSunk()) {
        this.endGame(this.ai);
      }
      // }
      // };
      // if (this.gameState.currentPlayer === p1 && !this.gameState.isAITurn) {

      // }
      // }

      // if (!this.gameState.isGameOver) {
      //   const clickHandler = (e) => {
      //     if (e.target.matches('.col-div') && this.gameState.hasGameStarted && this.gameState.currentPlayer === p1) {
      //       const input = [e.target.dataset.rowId, e.target.dataset.colId];
      //       console.log(input);
      //       const result = console.log('ships on board', this.p1.gameBoard.shipsOnBoard);
      //       console.log('ai.gb ships on board', this.ai.gameBoard.shipsOnBoard);
      //       console.log(this.gameState);

      //       if (this.gameState.isGameOver) {
      //         document.removeEventListener('click', clickHandler);
      //       }
      //     }
      //   };

      //   document.addEventListener('click', clickHandler);
      // }
      // this.aiAttack();
    },
  };
  return game;
};

module.exports = createGame;
