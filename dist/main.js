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

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n// const p1GameBoard = createGameBoard();\n// const p1 = createPlayer(playerOneName, aiGameBoard);\n\nconst gameLoop = (p1, ai, attackInput) => {\n//   p1GameBoard.createGrid();\n//   aiGameBoard.createGrid();\n  let isGameOver = false;\n  let currentPlayer = p1;\n\n  if (!isGameOver) {\n    if (currentPlayer === p1) {\n      if (p1.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return `${p1.name} Wins!`;\n      }\n      const result = p1.attackEnemyGameBoard(attackInput);\n      console.log(result);\n      // const input = prompt('What position would you like to hit? ');\n      // const coord = input.split(',').map((num) => parseInt(num.trim()));\n      // const result = p1.attackEnemyGameBoard(coord);\n      // console.log(`${playerOneName}'s turn:, ${result}`);\n      currentPlayer = ai;\n    } else if (currentPlayer === ai) {\n      if (ai.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return 'Ai Wins!';\n      }\n      const result = ai.attackEnemyGameBoard();\n      console.log('Ai turn:', result);\n      currentPlayer = p1;\n    }\n  }\n};\n\n// const gameLoop = (p1, p1GameBoard, aiGameBoard) => {\n//   // const p1GameBoard = createGameBoard();\n//   // p1.GameBoard.createGrid();\n//   p1GameBoard.createGrid();\n//   // const aiGameBoard = createGameBoard();\n//   aiGameBoard.createGrid();\n//   // const p1 = createPlayer(playerOneName, aiGameBoard);\n//   const ai = createAi(p1.gameBoard);\n\n//   const p1Carrier = createShip('Carrier', 5);\n//   const p1BattleShip = createShip('Battleship', 4);\n//   const p1Cruiser = createShip('Cruiser', 3);\n//   const p1Sub = createShip('Submarine', 3);\n//   const p1Destroyer = createShip('Destroyer', 2);\n//   p1GameBoard.placeShip([1, 1], p1Carrier, 'horizontal');\n//   p1GameBoard.placeShip([0, 0], p1BattleShip, 'vertical');\n//   p1GameBoard.placeShip([0, 1], p1Cruiser, 'horizontal');\n//   p1GameBoard.placeShip([6, 4], p1Sub, 'horizontal');\n//   p1GameBoard.placeShip([9, 3], p1Destroyer, 'horizontal');\n\n//   const aiCarrier = createShip('Carrier', 5);\n//   const aiBattleShip = createShip('Battleship', 4);\n//   const aiCruiser = createShip('Cruiser', 3);\n//   const aiSub = createShip('Submarine', 3);\n//   const aiDestroyer = createShip('Destroyer', 2);\n//   aiGameBoard.placeShip([1, 1], aiCarrier, 'horizontal');\n//   aiGameBoard.placeShip([9, 4], aiBattleShip, 'horizontal');\n//   aiGameBoard.placeShip([4, 5], aiCruiser, 'horizontal');\n//   aiGameBoard.placeShip([2, 2], aiSub, 'horizontal');\n//   aiGameBoard.placeShip([0, 0], aiDestroyer, 'vertical');\n\n//   let isGameOver = false;\n//   let currentPlayer = p1;\n\n//   while (!isGameOver) {\n//     if (currentPlayer === p1) {\n//       if (p1.gameBoard.allShipsSunk()) {\n//         isGameOver = true;\n//         return `${p1.name} Wins!`;\n//       }\n//       // const input = prompt('What position would you like to hit? ');\n//       // const coord = input.split(',').map((num) => parseInt(num.trim()));\n//       // const result = p1.attackEnemyGameBoard(coord);\n//       // console.log(`${playerOneName}'s turn:, ${result}`);\n//       currentPlayer = ai;\n//     } else if (currentPlayer === ai) {\n//       if (ai.gameBoard.allShipsSunk()) {\n//         isGameOver = true;\n//         return 'Ai Wins!';\n//       }\n//       const result = ai.attackEnemyGameBoard();\n//       console.log('Ai turn:', result);\n//       currentPlayer = p1;\n//     }\n//   }\n// };\n\nmodule.exports = gameLoop;\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

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

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst gameLoop = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst {\n  renderHeader, createForm, showShipsOnBoard, createMainContent,\n} = __webpack_require__(/*! ./mainContent */ \"./src/mainContent.js\");\n\nconst header = renderHeader();\nconst nameForm = createForm();\nconst nameInput = document.getElementById('player-name');\nconst nameSubmitButton = document.querySelector('.name-button');\nconst nameFormDiv = document.querySelector('.name-input-div');\nconst columns = document.querySelectorAll('.col-div');\nconst p1GameBoard = createGameBoard();\nconst aiGameBoard = createGameBoard();\nlet p1;\nnameSubmitButton.addEventListener('click', (e) => {\n  e.preventDefault();\n  if (nameInput) {\n    p1 = createPlayer(nameInput.value, aiGameBoard);\n    console.log(p1);\n    p1GameBoard.createGrid();\n    aiGameBoard.createGrid();\n    nameFormDiv.style.display = 'none';\n    createMainContent(p1.gameBoard);\n    console.log(nameInput);\n  }\n});\n\ndocument.addEventListener('click', (e) => {\n  if (e.target.matches('.place-ship-button')) {\n    e.preventDefault();\n    // const carrierInput = document.getElementById('carrier').value;\n    // const battleshipInput = document.getElementById('battleship').value;\n    // const cruiserInput = document.getElementById('cruiser').value;\n    // const submarineInput = document.getElementById('submarine').value;\n    // const destroyerInput = document.getElementById('destroyer').value;\n    const selectedAlignment = document.querySelector('input[name=\"alignment\"]:checked').value;\n    // console.log(selectedAlignment);\n    const ships = [\n      { name: 'carrier', length: 5, inputId: 'carrier' },\n      { name: 'battleship', length: 4, inputId: 'battleship' },\n      { name: 'cruiser', length: 3, inputId: 'cruiser' },\n      { name: 'submarine', length: 3, inputId: 'submarine' },\n      { name: 'destroyer', length: 2, inputId: 'destroyer' },\n    ];\n\n    ships.forEach((ship) => {\n      const input = document.getElementById(ship.inputId);\n      if (input.value) {\n        const newShip = createShip(ship.name, ship.length);\n        const coord = input.value.split(', ').map(Number);\n        p1.gameBoard.placeShip(coord, newShip, selectedAlignment);\n        showShipsOnBoard(coord, newShip, selectedAlignment);\n        console.log(input);\n        console.log(input.value);\n        console.log(p1.gameBoard.grid);\n        input.value = '';\n        input.classList.add('hidden');\n      }\n    });\n\n    // if (carrierInput) {\n    //   const carrier = createShip('carrier', 5);\n    //   const coord = carrierInput.split(', ').map(Number);\n    //   p1.gameBoard.placeShip(coord, carrier, selectedAlignment);\n    //   showShipsOnBoard(coord, carrier, selectedAlignment);\n    // }\n\n    // if (battleshipInput) {\n    //   const battleShip = createShip('battleship', 4);\n    // }\n\n    // if (cruiserInput) {\n    //   const cruiser = createShip('cruiser', 3);\n    // }\n\n    // if (submarineInput) {\n    //   const submarine = createShip('Submarine', 3);\n    // }\n\n    // if (destroyerInput) {\n    //   const destroyer = createShip('destroyer', 2);\n    // }\n  }\n});\n\ndocument.addEventListener('click', (e) => {\n  if (e.target.matches('.col-div')) {\n    // console.log(e.target.dataset.colId);\n    // console.log(e.target.dataset.rowId);\n    // console.log(p1.gameBoard.grid[e.target.dataset.rowId][e.target.dataset.colId]);\n    // p1.attackEnemyGameBoard(e.target);\n    // p1GameBoard.grid[e.target.dataset.colId][e.target.dataset.rowId] = 's';\n    // console.log(p1GameBoard.grid[e.target.dataset.colId][e.target.dataset.rowId]);\n    const input = [e.target.dataset.colId, e.target.dataset.rowId];\n    console.log(input);\n    console.log(p1.attackEnemyGameBoard(input));\n  }\n});\n\n// ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/mainContent.js":
/*!****************************!*\
  !*** ./src/mainContent.js ***!
  \****************************/
/***/ ((module) => {

eval("/* eslint-disable quote-props */\nconst container = document.querySelector('.container');\nconst createEl = (tag, className = '') => {\n  const el = document.createElement(tag);\n  if (className) {\n    el.classList.add(className);\n  }\n  return el;\n};\n\nconst createBattleshipDiv = () => {\n  const battleShipDiv = createEl('div', 'battleship-h1-div');\n  const battleshipTag = createEl('h1', 'battleship-tag');\n  battleshipTag.textContent = 'BATTLESHIP';\n  battleShipDiv.appendChild(battleshipTag);\n  return battleShipDiv;\n};\n\nconst createFormElems = () => {\n  const nameFormDiv = createEl('div', 'name-input-div');\n  const nameInputForm = createEl('form');\n  const nameLabel = createEl('label', 'name-label');\n  const nameInput = createEl('input');\n  const nameButton = createEl('button', 'name-button');\n  nameInputForm.setAttribute('id', 'name-form-id');\n  nameLabel.setAttribute('for', 'player-name');\n  nameLabel.textContent = 'First Name:';\n  nameInput.setAttribute('id', 'player-name');\n  nameButton.setAttribute('type', 'submit');\n  nameButton.innerText = 'Play game';\n\n  nameInputForm.appendChild(nameLabel);\n  nameInputForm.appendChild(nameInput);\n  nameInputForm.appendChild(nameButton);\n  nameFormDiv.appendChild(nameInputForm);\n\n  return nameFormDiv;\n};\n\nconst renderGameBoardGrid = (gameBoard) => {\n  const containerDiv = createEl('div', 'container-div');\n  let rowId = 0;\n  let colId = 0;\n  for (let i = 0; i < gameBoard.grid.length; i += 1) {\n    const rowDiv = createEl('div', 'row-div');\n    rowDiv.setAttribute('data-row-id', rowId);\n    rowId += 1;\n    colId = 0;\n    for (let j = 0; j < gameBoard.grid[i].length; j += 1) {\n      const colDiv = createEl('div', 'col-div');\n      colDiv.setAttribute('data-col-id', colId);\n      colDiv.setAttribute('data-row-id', rowDiv.getAttribute('data-row-id'));\n      colId += 1;\n      rowDiv.appendChild(colDiv);\n    }\n    containerDiv.appendChild(rowDiv);\n  }\n  return containerDiv;\n};\n\nconst renderHeader = () => {\n  const battleshipTag = createBattleshipDiv();\n  container.append(battleshipTag);\n};\n\nconst createForm = () => {\n  const formDiv = createFormElems();\n  container.appendChild(formDiv);\n};\n\nconst createInputLabel = (name) => {\n  const label = createEl('label');\n  label.textContent = name;\n  label.setAttribute('for', name.toLowerCase());\n\n  const input = createEl('input');\n  input.setAttribute('id', name.toLowerCase());\n\n  return [label, input];\n};\n\nconst createShipRadioGroup = () => {\n  const radioGroup = createEl('div', 'ship-alignment-options');\n  const options = ['Vertical', 'Horizontal'];\n  const name = 'alignment';\n  options.forEach((option) => {\n    const [label, input] = createInputLabel(option);\n    input.setAttribute('type', 'radio');\n    input.setAttribute('name', name);\n    input.setAttribute('value', option.toLowerCase());\n    radioGroup.appendChild(label);\n    radioGroup.appendChild(input);\n  });\n  return radioGroup;\n};\n\nconst createShipCheckboxes = () => {\n  const checkboxes = createEl('div', 'ships-list');\n  const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];\n  ships.forEach((ship) => {\n    const [label, input] = createInputLabel(ship);\n    checkboxes.appendChild(label);\n    checkboxes.appendChild(input);\n    input.setAttribute('pattern', '[0-9]');\n  });\n  return checkboxes;\n};\n\nconst createPlaceShipButton = () => {\n  const placeShipDiv = createEl('div', 'place-ship-div');\n  const placeShipButton = createEl('button', 'place-ship-button');\n  placeShipButton.innerText = 'Place ship!';\n  placeShipDiv.appendChild(placeShipButton);\n  return placeShipDiv;\n};\n\nconst leftSidePlaceShips = () => {\n  const placementDiv = createEl('div', 'ship-placement-container');\n  const placementH3 = createEl('h3', 'ship-placement-h3');\n  placementH3.textContent = 'Place your ships!';\n\n  const formDiv = createEl('div', 'ship-placement-form-div');\n  const form = createEl('form', 'ship-placement-form');\n\n  const alignmentP = createEl('p', 'alignment-p');\n  alignmentP.textContent = 'Choose your alignment:';\n\n  const radioGroup = createShipRadioGroup();\n  const checkboxes = createShipCheckboxes();\n  const placeShipButton = createPlaceShipButton();\n\n  placementDiv.append(placementH3);\n  formDiv.append(form);\n  form.append(alignmentP, radioGroup, checkboxes, placeShipButton);\n  placementDiv.append(formDiv);\n\n  return placementDiv;\n};\n\nconst showShipsOnBoard = (coord, ship, alignment) => {\n  const firstLetter = ship.name[0].toUpperCase();\n  const row = document.querySelector(`[data-row-id=\"${coord[0]}\"]`);\n  if (alignment === 'horizontal') {\n    for (let i = coord[1]; i < coord[1] + ship.length; i += 1) {\n      const cell = row.querySelector(`[data-col-id=\"${i}\"]`);\n      const p = createEl('p', 'ship-letter');\n      p.innerText = firstLetter;\n      cell.append(p);\n      console.log(cell);\n    }\n  }\n};\n\nconst createMainContent = (gameBoard) => {\n  const gameBoardDiv = createEl('div', 'game-board-div');\n  const underHeaderDiv = createEl('div', 'main-body-div');\n  const placementDivs = leftSidePlaceShips();\n\n  const renderGameGrid = renderGameBoardGrid(gameBoard);\n  container.appendChild(underHeaderDiv);\n  underHeaderDiv.appendChild(placementDivs);\n  underHeaderDiv.appendChild(gameBoardDiv);\n  gameBoardDiv.appendChild(renderGameGrid);\n};\n\nmodule.exports = {\n  renderHeader, createForm, showShipsOnBoard, createMainContent,\n};\n\n\n//# sourceURL=webpack://battleship/./src/mainContent.js?");

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