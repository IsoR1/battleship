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

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst { updateAttackResult } = __webpack_require__(/*! ./mainContent */ \"./src/mainContent.js\");\nconst { isGameOver } = __webpack_require__(/*! ./gameutils */ \"./src/gameutils.js\");\n\n// const gameLoop = async (p1, ai, attackInput, gameState) => {\n//   if (!gameState.isGameOver) {\n//     if (gameState.currentPlayer === p1) {\n//       if (p1.gameBoard.allShipsSunk()) {\n//         gameState.isGameOver = true;\n//         console.log(`${p1.name} Wins!`);\n//         return `${p1.name} Wins!`;\n//       }\n//       const result = p1.attackEnemyGameBoard(attackInput);\n//       console.log(result);\n//       updateAttackResult(p1.name, result);\n//       gameState.currentPlayer = ai;\n//     }\n//     if (gameState.currentPlayer === ai) {\n//       if (ai.gameBoard.allShipsSunk()) {\n//         gameState.isGameOver = true;\n//         console.log('Ai Wins!');\n//         return 'Ai Wins!';\n//       }\n//       await new Promise((resolve) => setTimeout(resolve, 2000));\n\n//       const result = ai.attackEnemyGameBoard();\n//       console.log('Ai turn:', result);\n//       updateAttackResult('ai', result);\n//       gameState.currentPlayer = p1;\n//     }\n//   }\n// };\n\nconst gameLoop = async (p1, ai, attackInput, gameState) => {\n  if (gameState.isGameOver) {\n    return; // Game is already over, exit the loop.\n  }\n\n  if (gameState.currentPlayer === p1) {\n    if (isGameOver(p1, ai)) {\n      gameState.isGameOver = true;\n      console.log(`${p1.name} Wins!`);\n      return `${p1.name} Wins!`;\n    }\n\n    const result = p1.attackEnemyGameBoard(attackInput);\n    console.log(result);\n    updateAttackResult(p1.name, result);\n    gameState.isAITurn = true; // Set the flag for AI's turn\n    gameState.currentPlayer = ai;\n  }\n\n  if (gameState.currentPlayer === ai && gameState.isAITurn) {\n    if (isGameOver(p1, ai)) {\n      gameState.isGameOver = true;\n      console.log('Ai Wins!');\n      return 'Ai Wins!';\n    }\n\n    await new Promise((resolve) => setTimeout(resolve, 2000));\n\n    const result = ai.attackEnemyGameBoard();\n    console.log('Ai turn:', result);\n    updateAttackResult('ai', result);\n    gameState.isAITurn = false; // Reset the flag for AI's turn\n    gameState.currentPlayer = p1;\n  }\n};\n\nmodule.exports = gameLoop;\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("const createGameBoard = () => {\n  const board = {\n    grid: [],\n    missedShots: [],\n    shipsOnBoard: [],\n\n    createGrid() {\n      for (let i = 0; i < 10; i += 1) {\n        const row = [];\n        for (let j = 0; j < 10; j += 1) {\n          row.push('');\n        }\n        this.grid.push(row);\n      }\n    },\n    placeShip(coord, ship, alignment) {\n      if (!alignment) {\n        throw new Error('Alignment is required to place a ship');\n      }\n\n      // Check if coord is an array with 2 elements\n      if (!Array.isArray(coord) || coord.length !== 2) {\n        throw new Error('coord should be an array with 2 elements');\n      }\n\n      const upperAlignment = alignment.toUpperCase();\n\n      let isValidPosition = false;\n      let attempts = 0;\n      const maxAttempts = 1000;\n      while (!isValidPosition && attempts <= maxAttempts) {\n        isValidPosition = true;\n\n        if (upperAlignment === 'VERTICAL') {\n          const endRow = coord[0] + ship.length - 1;\n          if (endRow >= this.grid.length) {\n            isValidPosition = false;\n            attempts += 1;\n            break; // Try a different position\n          }\n          for (let i = coord[0]; i <= endRow; i += 1) {\n            if (!this.grid[i] || this.grid[i][coord[1]] !== '') {\n              isValidPosition = false;\n              attempts += 1;\n              break;\n            }\n          }\n          if (isValidPosition) {\n            for (let i = coord[0]; i <= endRow; i += 1) {\n              this.grid[i][coord[1]] = ship;\n            }\n          }\n        } else if (upperAlignment === 'HORIZONTAL') {\n          const endCol = coord[1] + ship.length - 1;\n          if (endCol >= this.grid[coord[0]].length) {\n            isValidPosition = false;\n            attempts += 1;\n            break; // Try a different position\n          }\n          for (let i = coord[1]; i <= endCol; i += 1) {\n            if (!this.grid[coord[0]] || this.grid[coord[0]][i] !== '') {\n              isValidPosition = false;\n              attempts += 1;\n              break;\n            }\n          }\n          if (isValidPosition) {\n            for (let i = coord[1]; i <= endCol; i += 1) {\n              this.grid[coord[0]][i] = ship;\n            }\n          }\n        }\n      }\n\n      if (attempts === maxAttempts) {\n        throw new Error('Unable to place the ship in a valid position');\n      }\n\n      if (isValidPosition) {\n        this.shipsOnBoard.push(ship);\n        return true;\n      }\n    },\n    receiveAttack(coord) {\n      const targetedShip = this.grid[coord[0]][coord[1]];\n      if (typeof targetedShip === 'object') {\n        targetedShip.hit();\n        if (targetedShip.isSunk()) {\n          const sunkShipIndex = this.shipsOnBoard.indexOf(targetedShip);\n          this.shipsOnBoard.splice(sunkShipIndex, 1);\n\n          for (let i = 0; i < this.grid.length; i += 1) {\n            for (let j = 0; j < this.grid[i].length; j += 1) {\n              if (this.grid[i][j] === targetedShip) {\n                this.grid[i][j] = '';\n              }\n            }\n          }\n          return `sunk a ${targetedShip.name}!`;\n        }\n        return 'Hit!';\n      }\n      this.missedShots.push([coord[0], coord[1]]);\n      return ('Miss!');\n    },\n    allShipsSunk() {\n      return this.shipsOnBoard.length === 0;\n    },\n  };\n  return board;\n};\n\nmodule.exports = createGameBoard;\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/gameutils.js":
/*!**************************!*\
  !*** ./src/gameutils.js ***!
  \**************************/
/***/ ((module) => {

eval("const isGameOver = (p1, ai) => {\n  if (p1.gameBoard.allShipsSunk()) {\n    console.log(`${p1.name} wins`);\n    return true;\n  }\n\n  if (ai.gameBoard.allShipsSunk()) {\n    console.log('Ai wins');\n    return true;\n  }\n\n  return false;\n};\n\nmodule.exports = { isGameOver };\n\n\n//# sourceURL=webpack://battleship/./src/gameutils.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst gameLoop = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst {\n  renderHeader, createForm, createAttackInstructions, createAttackResultsContainer, updateAttackResult, createMainContent,\n} = __webpack_require__(/*! ./mainContent */ \"./src/mainContent.js\");\n\n// const header = renderHeader();\nrenderHeader();\ncreateForm();\n// const nameForm = createForm();\nconst nameInput = document.getElementById('player-name');\nconst nameSubmitButton = document.querySelector('.name-button');\nconst nameFormDiv = document.querySelector('.name-input-div');\nconst columns = document.querySelectorAll('.col-div');\nconst p1GameBoard = createGameBoard();\nconst aiGameBoard = createGameBoard();\nlet p1;\nconst ai = createAi(p1GameBoard);\nconst gameState = {\n  isGameOver: false,\n  currentPlayer: p1,\n  hasGameStarted: false,\n  isAiTurn: false,\n};\nlet numShipsPlaced = 0;\nnameSubmitButton.addEventListener('click', (e) => {\n  e.preventDefault();\n  if (nameInput) {\n    p1 = createPlayer(nameInput.value, aiGameBoard);\n    gameState.currentPlayer = p1;\n    console.log(p1);\n    p1GameBoard.createGrid();\n    aiGameBoard.createGrid();\n    nameFormDiv.style.display = 'none';\n    createMainContent(p1.gameBoard);\n  }\n});\n\ndocument.addEventListener('click', (e) => {\n  if (e.target.matches('.place-ship-button')) {\n    e.preventDefault();\n\n    const selectedAlignment = document.querySelector('input[name=\"alignment\"]:checked').value;\n\n    const ships = [\n      { name: 'carrier', length: 5, inputId: 'carrier' },\n      { name: 'battleship', length: 4, inputId: 'battleship' },\n      { name: 'cruiser', length: 3, inputId: 'cruiser' },\n      { name: 'submarine', length: 3, inputId: 'submarine' },\n      { name: 'destroyer', length: 2, inputId: 'destroyer' },\n    ];\n    const numShips = ships.length;\n\n    ships.forEach((ship) => {\n      const input = document.getElementById(ship.inputId);\n      if (input.value) {\n        const newShip = createShip(ship.name, ship.length);\n        const coord = input.value.split(', ').map(Number);\n        const placement = ai.gameBoard.placeShip(coord, newShip, selectedAlignment);\n        if (placement) {\n          input.value = '';\n          input.classList.add('hidden');\n          numShipsPlaced += 1;\n        }\n      }\n    });\n\n    if (numShipsPlaced === numShips) {\n      // AI ship placement\n      const aiShips = [\n        // { name: 'carrier', length: 5 },\n        // { name: 'battleship', length: 4 },\n        // { name: 'cruiser', length: 3 },\n        // { name: 'submarine', length: 3 },\n        { name: 'destroyer', length: 2 },\n      ];\n\n      aiShips.forEach((ship) => {\n        let isValidPlacement = false;\n        let placementCoord;\n        let placementAlignment;\n\n        while (!isValidPlacement) {\n          const coordRow = Math.floor(Math.random() * p1.gameBoard.grid.length);\n          const subArr = p1.gameBoard.grid[coordRow];\n          const coordCol = Math.floor(Math.random() * subArr.length);\n          const coord = [coordRow, coordCol];\n          const options = ['VERTICAL', 'HORIZONTAL'];\n          const randomAlignment = options[Math.floor(Math.random() * options.length)];\n          console.log(randomAlignment);\n          console.log(coord);\n\n          const newShip = createShip(ship.name, ship.length);\n          const p1Placement = p1.gameBoard.placeShip(coord, newShip, randomAlignment);\n\n          if (p1Placement) {\n            isValidPlacement = true;\n            placementCoord = coord;\n            placementAlignment = randomAlignment;\n          }\n        }\n        console.log('success:', placementAlignment, placementCoord);\n      });\n      console.log('ships on board on start', p1.gameBoard.shipsOnBoard);\n      const attackInstructions = createAttackInstructions();\n      const hitMissDivCon = createAttackResultsContainer();\n      const underHeaderDiv = document.querySelector('.main-body-div');\n      const gameBoardDiv = document.querySelector('.game-board-div');\n      const shipPlacementContainer = document.querySelector('.ship-placement-container');\n      shipPlacementContainer.remove();\n      underHeaderDiv.insertBefore(attackInstructions, underHeaderDiv.firstChild);\n      underHeaderDiv.insertBefore(hitMissDivCon, underHeaderDiv.children[1]);\n      underHeaderDiv.style.flexDirection = 'column';\n      gameBoardDiv.style.justifyContent = 'center';\n      gameBoardDiv.style.alignItems = 'center';\n      gameState.hasGameStarted = true;\n    }\n  }\n});\n\nif (!gameState.isGameOver) {\n  const clickHandler = (e) => {\n    if (e.target.matches('.col-div') && gameState.hasGameStarted && gameState.currentPlayer === p1) {\n      const input = [e.target.dataset.rowId, e.target.dataset.colId];\n      console.log(input);\n      const result = gameLoop(p1, ai, input, gameState);\n      console.log('ships on board', p1.gameBoard.shipsOnBoard);\n      console.log('ai.gb ships on board', ai.gameBoard.shipsOnBoard);\n      console.log(gameState);\n\n      if (gameState.isGameOver) {\n        console.log(`Winner: ${gameState.currentPlayer.name}`);\n        document.removeEventListener('click', clickHandler);\n      }\n    }\n  };\n\n  document.addEventListener('click', clickHandler);\n}\n\nif (gameState.isGameOver) {\n  console.log('s');\n}\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/mainContent.js":
/*!****************************!*\
  !*** ./src/mainContent.js ***!
  \****************************/
/***/ ((module) => {

eval("/* eslint-disable quote-props */\nconst container = document.querySelector('.container');\nconst createEl = (tag, className = '') => {\n  const el = document.createElement(tag);\n  if (className) {\n    el.classList.add(className);\n  }\n  return el;\n};\n\nconst createBattleshipDiv = () => {\n  const battleShipDiv = createEl('div', 'battleship-h1-div');\n  const battleshipTag = createEl('h1', 'battleship-tag');\n  battleshipTag.textContent = 'BATTLESHIP';\n  battleShipDiv.appendChild(battleshipTag);\n  return battleShipDiv;\n};\n\nconst createFormElems = () => {\n  const nameFormDiv = createEl('div', 'name-input-div');\n  const nameInputForm = createEl('form');\n  const nameLabel = createEl('label', 'name-label');\n  const nameInput = createEl('input');\n  const nameButton = createEl('button', 'name-button');\n  nameInputForm.setAttribute('id', 'name-form-id');\n  nameLabel.setAttribute('for', 'player-name');\n  nameLabel.textContent = 'Name:';\n  nameInput.setAttribute('id', 'player-name');\n  nameButton.setAttribute('type', 'submit');\n  nameButton.innerText = 'Play game';\n\n  nameInputForm.appendChild(nameLabel);\n  nameInputForm.appendChild(nameInput);\n  nameInputForm.appendChild(nameButton);\n  nameFormDiv.appendChild(nameInputForm);\n\n  return nameFormDiv;\n};\n\nconst renderGameBoardGrid = (gameBoard) => {\n  const containerDiv = createEl('div', 'container-div');\n  let rowId = 0;\n  let colId = 0;\n  for (let i = 0; i < gameBoard.grid.length; i += 1) {\n    const rowDiv = createEl('div', 'row-div');\n    rowDiv.setAttribute('data-row-id', rowId);\n    rowId += 1;\n    colId = 0;\n    for (let j = 0; j < gameBoard.grid[i].length; j += 1) {\n      const colDiv = createEl('div', 'col-div');\n      colDiv.setAttribute('data-col-id', colId);\n      colDiv.setAttribute('data-row-id', rowDiv.getAttribute('data-row-id'));\n      colId += 1;\n      rowDiv.appendChild(colDiv);\n    }\n    containerDiv.appendChild(rowDiv);\n  }\n  return containerDiv;\n};\n\nconst renderHeader = () => {\n  const battleshipTag = createBattleshipDiv();\n  container.append(battleshipTag);\n};\n\nconst createForm = () => {\n  const formDiv = createFormElems();\n  container.appendChild(formDiv);\n};\n\nconst createInputLabel = (name) => {\n  const label = createEl('label');\n  label.textContent = name;\n  label.setAttribute('for', name.toLowerCase());\n\n  const input = createEl('input');\n  input.setAttribute('id', name.toLowerCase());\n\n  return [label, input];\n};\n\nconst createShipRadioGroup = () => {\n  const radioGroup = createEl('div', 'ship-alignment-options');\n  const options = ['Vertical', 'Horizontal'];\n  const name = 'alignment';\n  options.forEach((option) => {\n    const [label, input] = createInputLabel(option);\n    input.setAttribute('type', 'radio');\n    input.setAttribute('name', name);\n    input.setAttribute('value', option.toLowerCase());\n    radioGroup.appendChild(label);\n    radioGroup.appendChild(input);\n  });\n  return radioGroup;\n};\n\nconst createShipCheckboxes = () => {\n  const checkboxes = createEl('div', 'ships-list');\n  const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];\n  ships.forEach((ship) => {\n    const [label, input] = createInputLabel(ship);\n    checkboxes.appendChild(label);\n    checkboxes.appendChild(input);\n    input.setAttribute('pattern', '[0-9]');\n  });\n  return checkboxes;\n};\n\nconst createPlaceShipButton = () => {\n  const placeShipDiv = createEl('div', 'place-ship-div');\n  const placeShipButton = createEl('button', 'place-ship-button');\n  placeShipButton.innerText = 'Place ship!';\n  placeShipDiv.appendChild(placeShipButton);\n  return placeShipDiv;\n};\n\nconst leftSidePlaceShips = () => {\n  const placementDiv = createEl('div', 'ship-placement-container');\n  const placementH3 = createEl('h3', 'ship-placement-h3');\n  placementH3.textContent = 'Place your ships!';\n\n  const formDiv = createEl('div', 'ship-placement-form-div');\n  const form = createEl('form', 'ship-placement-form');\n\n  const alignmentP = createEl('p', 'alignment-p');\n  alignmentP.textContent = 'Choose your alignment:';\n\n  const radioGroup = createShipRadioGroup();\n  const checkboxes = createShipCheckboxes();\n  const placeShipButton = createPlaceShipButton();\n\n  placementDiv.append(placementH3);\n  formDiv.append(form);\n  form.append(alignmentP, radioGroup, checkboxes, placeShipButton);\n  placementDiv.append(formDiv);\n\n  return placementDiv;\n};\n\n//\n// const showShipsOnBoard = (coord, ship, alignment) => {\n//   const firstLetter = ship.name[0].toUpperCase();\n//   const row = document.querySelector(`[data-row-id=\"${coord[0]}\"]`);\n//   if (alignment === 'horizontal') {\n//     for (let i = coord[1]; i < coord[1] + ship.length; i += 1) {\n//       const cell = row.querySelector(`[data-col-id=\"${i}\"]`);\n//       const p = createEl('p', 'ship-letter');\n//       p.innerText = firstLetter;\n//       cell.append(p);\n//     }\n//   }\n// };\n\nconst createAttackInstructions = () => {\n  const div = createEl('div', 'attack-instructions-div');\n  const h2 = createEl('h2', 'attack-instructions-h2');\n  h2.textContent = 'Click a square to attack it';\n  div.appendChild(h2);\n  return div;\n};\n\nconst createAttackResultsContainer = () => {\n  const div = createEl('div', 'attack-results-div');\n  const h3 = createEl('h3', 'attack-results-h3');\n\n  div.appendChild(h3);\n\n  return div;\n};\n\nconst updateAttackResult = (player, attack) => {\n  const h3 = document.querySelector('.attack-results-h3');\n  h3.textContent = `${player.substring(0, 1).toUpperCase() + player.substring(1)}'s attack: ${attack}`;\n};\n\nconst createMainContent = (gameBoard) => {\n  const gameBoardDiv = createEl('div', 'game-board-div');\n  const underHeaderDiv = createEl('div', 'main-body-div');\n  const placementDivs = leftSidePlaceShips();\n  // const hitMissDiv = createHitMissText();\n\n  const renderGameGrid = renderGameBoardGrid(gameBoard);\n  container.appendChild(underHeaderDiv);\n  underHeaderDiv.appendChild(placementDivs);\n  // underHeaderDiv.appendChild(hitMissDiv);\n  underHeaderDiv.appendChild(gameBoardDiv);\n  gameBoardDiv.appendChild(renderGameGrid);\n};\n\nmodule.exports = {\n  renderHeader,\n  createForm,\n  createAttackInstructions,\n  createAttackResultsContainer,\n  updateAttackResult,\n  createMainContent,\n};\n\n\n//# sourceURL=webpack://battleship/./src/mainContent.js?");

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