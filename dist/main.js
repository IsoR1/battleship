/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\nconst gameLoop = (playerOneName) => {\n  const p1GameBoard = createGameBoard();\n  p1GameBoard.createGrid();\n  const aiGameBoard = createGameBoard();\n  aiGameBoard.createGrid();\n  const p1 = createPlayer(playerOneName, aiGameBoard);\n  const ai = createAi(p1GameBoard);\n\n  const p1Carrier = createShip('Carrier', 5);\n  const p1BattleShip = createShip('Battleship', 4);\n  const p1Cruiser = createShip('Cruiser', 3);\n  const p1Sub = createShip('Submarine', 3);\n  const p1Destroyer = createShip('Destroyer', 2);\n  p1GameBoard.placeShip([1, 1], p1Carrier, 'horizontal');\n  p1GameBoard.placeShip([0, 0], p1BattleShip, 'vertical');\n  p1GameBoard.placeShip([0, 1], p1Cruiser, 'horizontal');\n  p1GameBoard.placeShip([6, 4], p1Sub, 'horizontal');\n  p1GameBoard.placeShip([9, 3], p1Destroyer, 'horizontal');\n\n  const aiCarrier = createShip('Carrier', 5);\n  const aiBattleShip = createShip('Battleship', 4);\n  const aiCruiser = createShip('Cruiser', 3);\n  const aiSub = createShip('Submarine', 3);\n  const aiDestroyer = createShip('Destroyer', 2);\n  aiGameBoard.placeShip([1, 1], aiCarrier, 'horizontal');\n  aiGameBoard.placeShip([9, 4], aiBattleShip, 'horizontal');\n  aiGameBoard.placeShip([4, 5], aiCruiser, 'horizontal');\n  aiGameBoard.placeShip([2, 2], aiSub, 'horizontal');\n  aiGameBoard.placeShip([0, 0], aiDestroyer, 'vertical');\n\n  let isGameOver = false;\n  let currentPlayer = p1;\n\n  while (!isGameOver) {\n    if (currentPlayer === p1) {\n      if (p1.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return `${playerOneName} Wins!`;\n      }\n      const input = prompt('What position would you like to hit? ');\n      const coord = input.split(',').map((num) => parseInt(num.trim()));\n      const result = p1.attackEnemyGameBoard(coord);\n      console.log(`${playerOneName}'s turn:, ${result}`);\n      currentPlayer = ai;\n    } else if (currentPlayer === ai) {\n      if (ai.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return 'Ai Wins!';\n      }\n      const result = ai.attackEnemyGameBoard();\n      console.log('Ai turn:', result);\n      currentPlayer = p1;\n    }\n  }\n};\n\nmodule.exports = gameLoop;\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("const createGameBoard = () => {\n  const board = {\n    grid: [],\n    missedShots: [],\n    shipsOnBoard: [],\n\n    createGrid() {\n      for (let i = 0; i < 10; i += 1) {\n        const row = [];\n        for (let j = 0; j < 10; j += 1) {\n          row.push('');\n        }\n        this.grid.push(row);\n      }\n    },\n    placeShip(coord, ship, alignment) {\n      if (!alignment) {\n        throw new Error('Alignment is required to place a ship');\n      }\n      const upperAlignment = alignment.toUpperCase();\n      if (upperAlignment === 'VERTICAL') {\n        const endRow = coord[0] + ship.length - 1;\n        for (let i = coord[0]; i <= endRow; i += 1) {\n          if (this.grid[i][coord[1]] !== '') {\n            throw new Error('There is already a ship at this position');\n          }\n          this.grid[i][coord[1]] = ship;\n        }\n      } else if (upperAlignment === 'HORIZONTAL') {\n        const endCol = coord[1] + ship.length - 1;\n        for (let i = coord[1]; i <= endCol; i += 1) {\n          if (this.grid[coord[0]][i] !== '') {\n            throw new Error('There is already a ship at this position');\n          }\n          this.grid[coord[0]][i] = ship;\n        }\n      }\n      this.shipsOnBoard.push(ship);\n    },\n    receiveAttack(coord) {\n      const targetedShip = this.grid[coord[0]][coord[1]];\n      if (typeof targetedShip === 'object') {\n        targetedShip.hit();\n        if (targetedShip.isSunk()) {\n          const sunkShipIndex = this.shipsOnBoard.indexOf(targetedShip);\n          this.shipsOnBoard.splice(sunkShipIndex, 1);\n          return `${targetedShip.name} has been sunk!`;\n        }\n        return 'Hit!';\n      }\n      this.missedShots.push([coord[0], coord[1]]);\n      return ('Miss!');\n    },\n    allShipsSunk() {\n      return this.shipsOnBoard.length === 0;\n    },\n  };\n  return board;\n};\n\nmodule.exports = createGameBoard;\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst gameLoop = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst createMainContent = __webpack_require__(/*! ./mainContent */ \"./src/mainContent.js\");\n\n// const ship = createShip('submarine', 3);\n// const gb = createGameBoard();\n// const ai = createAi(gb);\ncreateMainContent();\nconst nameInput = document.getElementById('player-name');\nconst nameSubmitButton = document.querySelector('.name-button');\nnameSubmitButton.addEventListener('click', (e) => {\n  e.preventDefault();\n  if (nameInput) {\n    console.log(nameInput.value);\n    console.log(gameLoop(nameInput.value));\n  }\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/mainContent.js":
/*!****************************!*\
  !*** ./src/mainContent.js ***!
  \****************************/
/***/ ((module) => {

eval("const container = document.querySelector('.container');\nconst createEl = (tag, className = '') => {\n  const el = document.createElement(tag);\n  if (className) {\n    el.classList.add(className);\n  }\n  return el;\n};\n\nconst createBattleshipDiv = () => {\n  const battleShipDiv = createEl('div', 'battleship-h1-div');\n  const battleshipTag = createEl('h1', 'battleship-tag');\n  battleshipTag.textContent = 'BATTLESHIP';\n  battleShipDiv.appendChild(battleshipTag);\n  return battleShipDiv;\n};\n\nconst createFormElems = () => {\n  const nameFormDiv = createEl('div', 'name-input-div');\n  const nameInputForm = createEl('form');\n  const nameLabel = createEl('label', 'name-label');\n  const nameInput = createEl('input');\n  const nameButton = createEl('button', 'name-button');\n  nameInputForm.setAttribute('id', 'name-form-id');\n  nameLabel.setAttribute('for', 'player-name');\n  nameLabel.textContent = 'First Name:';\n  nameInput.setAttribute('id', 'player-name');\n  nameButton.setAttribute('type', 'submit');\n  nameButton.innerText = 'Play game';\n\n  nameInputForm.appendChild(nameLabel);\n  nameInputForm.appendChild(nameInput);\n  nameInputForm.appendChild(nameButton);\n  nameFormDiv.appendChild(nameInputForm);\n\n  return nameFormDiv;\n};\n\nconst createMainContent = () => {\n  const battleshipTag = createBattleshipDiv();\n  const gameBoardDiv = createEl('div', 'game-board-div');\n  const formDiv = createFormElems();\n\n  container.append(battleshipTag);\n  container.appendChild(gameBoardDiv);\n  gameBoardDiv.appendChild(formDiv);\n};\n\nmodule.exports = createMainContent;\n\n\n//# sourceURL=webpack://battleship/./src/mainContent.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("const createPlayer = (name, gameBoard) => {\n  const player = {\n    name,\n    gameBoard,\n    attackEnemyGameBoard(coord) {\n      return this.gameBoard.receiveAttack(coord);\n    },\n  };\n  return player;\n};\n\nconst createAi = (gameBoard) => {\n  const ai = {\n    gameBoard,\n    attackEnemyGameBoard() {\n      const coordRow = Math.floor(Math.random() * gameBoard.grid.length);\n      const subArr = gameBoard.grid[coordRow];\n      const coordCol = Math.floor(Math.random() * subArr.length);\n      const coord = [coordRow, coordCol];\n      const coordHit = gameBoard.missedShots.some((el) => coord[0] === el[0] && coord[1] === el[1]);\n      if (!coordHit) {\n        return this.gameBoard.receiveAttack(coord);\n      }\n      return 'Position has already been hit';\n    },\n  };\n  return ai;\n};\n\nmodule.exports = { createPlayer, createAi };\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("function createShip(name, length) {\n  const ship = {\n    name,\n    length,\n    hits: 0,\n    hit() {\n      this.hits += 1;\n    },\n    isSunk() {\n      return this.hits >= this.length;\n    },\n  };\n  return ship;\n}\n\nmodule.exports = createShip;\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;