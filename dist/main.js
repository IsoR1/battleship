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

/***/ "./node_modules/prompt-sync/index.js":
/*!*******************************************!*\
  !*** ./node_modules/prompt-sync/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar stripAnsi = __webpack_require__(/*! strip-ansi */ \"./node_modules/prompt-sync/node_modules/strip-ansi/index.js\");\nvar term = 13; // carriage return\n\n/**\n * create -- sync function for reading user input from stdin\n * @param   {Object} config {\n *   sigint: {Boolean} exit on ^C\n *   autocomplete: {StringArray} function({String})\n *   history: {String} a history control object (see `prompt-sync-history`)\n * }\n * @returns {Function} prompt function\n */\n\n // for ANSI escape codes reference see https://en.wikipedia.org/wiki/ANSI_escape_code\n\nfunction create(config) {\n\n  config = config || {};\n  var sigint = config.sigint;\n  var eot = config.eot;\n  var autocomplete = config.autocomplete =\n    config.autocomplete || function(){return []};\n  var history = config.history;\n  prompt.history = history || {save: function(){}};\n  prompt.hide = function (ask) { return prompt(ask, {echo: ''}) };\n\n  return prompt;\n\n\n  /**\n   * prompt -- sync function for reading user input from stdin\n   *  @param {String} ask opening question/statement to prompt for\n   *  @param {String} value initial value for the prompt\n   *  @param   {Object} opts {\n   *   echo: set to a character to be echoed, default is '*'. Use '' for no echo\n   *   value: {String} initial value for the prompt\n   *   ask: {String} opening question/statement to prompt for, does not override ask param\n   *   autocomplete: {StringArray} function({String})\n   * }\n   *\n   * @returns {string} Returns the string input or (if sigint === false)\n   *                   null if user terminates with a ^C\n   */\n\n\n  function prompt(ask, value, opts) {\n    var insert = 0, savedinsert = 0, res, i, savedstr;\n    opts = opts || {};\n\n    if (Object(ask) === ask) {\n      opts = ask;\n      ask = opts.ask;\n    } else if (Object(value) === value) {\n      opts = value;\n      value = opts.value;\n    }\n    ask = ask || '';\n    var echo = opts.echo;\n    var masked = 'echo' in opts;\n    autocomplete = opts.autocomplete || autocomplete;\n\n    var fd = (process.platform === 'win32') ?\n      process.stdin.fd :\n      fs.openSync('/dev/tty', 'rs');\n\n    var wasRaw = process.stdin.isRaw;\n    if (!wasRaw) { process.stdin.setRawMode && process.stdin.setRawMode(true); }\n\n    var buf = Buffer.alloc(3);\n    var str = '', character, read;\n\n    savedstr = '';\n\n    if (ask) {\n      process.stdout.write(ask);\n    }\n\n    var cycle = 0;\n    var prevComplete;\n\n    while (true) {\n      read = fs.readSync(fd, buf, 0, 3);\n      if (read > 1) { // received a control sequence\n        switch(buf.toString()) {\n          case '\\u001b[A':  //up arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.atStart()) break;\n\n            if (history.atEnd()) {\n              savedstr = str;\n              savedinsert = insert;\n            }\n            str = history.prev();\n            insert = str.length;\n            process.stdout.write('\\u001b[2K\\u001b[0G' + ask + str);\n            break;\n          case '\\u001b[B':  //down arrow\n            if (masked) break;\n            if (!history) break;\n            if (history.pastEnd()) break;\n\n            if (history.atPenultimate()) {\n              str = savedstr;\n              insert = savedinsert;\n              history.next();\n            } else {\n              str = history.next();\n              insert = str.length;\n            }\n            process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str + '\\u001b['+(insert+ask.length+1)+'G');\n            break;\n          case '\\u001b[D': //left arrow\n            if (masked) break;\n            var before = insert;\n            insert = (--insert < 0) ? 0 : insert;\n            if (before - insert)\n              process.stdout.write('\\u001b[1D');\n            break;\n          case '\\u001b[C': //right arrow\n            if (masked) break;\n            insert = (++insert > str.length) ? str.length : insert;\n            process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n            break;\n          default:\n            if (buf.toString()) {\n              str = str + buf.toString();\n              str = str.replace(/\\0/g, '');\n              insert = str.length;\n              promptPrint(masked, ask, echo, str, insert);\n              process.stdout.write('\\u001b[' + (insert+ask.length+1) + 'G');\n              buf = Buffer.alloc(3);\n            }\n        }\n        continue; // any other 3 character sequence is ignored\n      }\n\n      // if it is not a control character seq, assume only one character is read\n      character = buf[read-1];\n\n      // catch a ^C and return null\n      if (character == 3){\n        process.stdout.write('^C\\n');\n        fs.closeSync(fd);\n\n        if (sigint) process.exit(130);\n\n        process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n        return null;\n      }\n\n      // catch a ^D and exit\n      if (character == 4) {\n        if (str.length == 0 && eot) {\n          process.stdout.write('exit\\n');\n          process.exit(0);\n        }\n      }\n\n      // catch the terminating character\n      if (character == term) {\n        fs.closeSync(fd);\n        if (!history) break;\n        if (!masked && str.length) history.push(str);\n        history.reset();\n        break;\n      }\n\n      // catch a TAB and implement autocomplete\n      if (character == 9) { // TAB\n        res = autocomplete(str);\n\n        if (str == res[0]) {\n          res = autocomplete('');\n        } else {\n          prevComplete = res.length;\n        }\n\n        if (res.length == 0) {\n          process.stdout.write('\\t');\n          continue;\n        }\n\n        var item = res[cycle++] || res[cycle = 0, cycle++];\n\n        if (item) {\n          process.stdout.write('\\r\\u001b[K' + ask + item);\n          str = item;\n          insert = item.length;\n        }\n      }\n\n      if (character == 127 || (process.platform == 'win32' && character == 8)) { //backspace\n        if (!insert) continue;\n        str = str.slice(0, insert-1) + str.slice(insert);\n        insert--;\n        process.stdout.write('\\u001b[2D');\n      } else {\n        if ((character < 32 ) || (character > 126))\n            continue;\n        str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);\n        insert++;\n      };\n\n      promptPrint(masked, ask, echo, str, insert);\n\n    }\n\n    process.stdout.write('\\n')\n\n    process.stdin.setRawMode && process.stdin.setRawMode(wasRaw);\n\n    return str || value || '';\n  };\n\n\n  function promptPrint(masked, ask, echo, str, insert) {\n    if (masked) {\n        process.stdout.write('\\u001b[2K\\u001b[0G' + ask + Array(str.length+1).join(echo));\n    } else {\n      process.stdout.write('\\u001b[s');\n      if (insert == str.length) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n      } else {\n        if (ask) {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ ask + str);\n        } else {\n          process.stdout.write('\\u001b[2K\\u001b[0G'+ str + '\\u001b[' + (str.length - insert) + 'D');\n        }\n      }\n\n      // Reposition the cursor to the right of the insertion point\n      var askLength = stripAnsi(ask).length;\n      process.stdout.write(`\\u001b[${askLength+1+(echo==''? 0:insert)}G`);\n    }\n  }\n};\n\nmodule.exports = create;\n\n\n//# sourceURL=webpack://battleship/./node_modules/prompt-sync/index.js?");

/***/ }),

/***/ "./node_modules/prompt-sync/node_modules/ansi-regex/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/prompt-sync/node_modules/ansi-regex/index.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = options => {\n\toptions = Object.assign({\n\t\tonlyFirst: false\n\t}, options);\n\n\tconst pattern = [\n\t\t'[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, options.onlyFirst ? undefined : 'g');\n};\n\n\n//# sourceURL=webpack://battleship/./node_modules/prompt-sync/node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/prompt-sync/node_modules/strip-ansi/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/prompt-sync/node_modules/strip-ansi/index.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/prompt-sync/node_modules/ansi-regex/index.js\");\n\nconst stripAnsi = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;\n\nmodule.exports = stripAnsi;\nmodule.exports[\"default\"] = stripAnsi;\n\n\n//# sourceURL=webpack://battleship/./node_modules/prompt-sync/node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const prompt = __webpack_require__(/*! prompt-sync */ \"./node_modules/prompt-sync/index.js\")({ sigint: true });\nconst createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\nconst gameLoop = (playerOneName) => {\n  const p1GameBoard = createGameBoard();\n  p1GameBoard.createGrid();\n  const aiGameBoard = createGameBoard();\n  aiGameBoard.createGrid();\n  const p1 = createPlayer(playerOneName, aiGameBoard);\n  const ai = createAi(p1GameBoard);\n\n  const p1Carrier = createShip('Carrier', 5);\n  const p1BattleShip = createShip('Battleship', 4);\n  const p1Cruiser = createShip('Cruiser', 3);\n  const p1Sub = createShip('Submarine', 3);\n  const p1Destroyer = createShip('Destroyer', 2);\n  p1GameBoard.placeShip([1, 1], p1Carrier, 'horizontal');\n  p1GameBoard.placeShip([0, 0], p1BattleShip, 'vertical');\n  p1GameBoard.placeShip([0, 1], p1Cruiser, 'horizontal');\n  p1GameBoard.placeShip([6, 4], p1Sub, 'horizontal');\n  p1GameBoard.placeShip([9, 3], p1Destroyer, 'horizontal');\n\n  const aiCarrier = createShip('Carrier', 5);\n  const aiBattleShip = createShip('Battleship', 4);\n  const aiCruiser = createShip('Cruiser', 3);\n  const aiSub = createShip('Submarine', 3);\n  const aiDestroyer = createShip('Destroyer', 2);\n  aiGameBoard.placeShip([1, 1], aiCarrier, 'horizontal');\n  aiGameBoard.placeShip([9, 4], aiBattleShip, 'horizontal');\n  aiGameBoard.placeShip([4, 5], aiCruiser, 'horizontal');\n  aiGameBoard.placeShip([2, 2], aiSub, 'horizontal');\n  aiGameBoard.placeShip([0, 0], aiDestroyer, 'vertical');\n\n  let isGameOver = false;\n  let currentPlayer = p1;\n\n  while (!isGameOver) {\n    if (currentPlayer === p1) {\n      if (p1.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return 'Player One Wins!';\n      }\n      // const prompt = require('prompt-sync')({ sigint: true });\n      const input = prompt('What position would you like to hit? ');\n      const coord = input.split(',').map((num) => parseInt(num.trim()));\n      const result = p1.attackEnemyGameBoard(coord);\n      console.log('Player turn:', result);\n      currentPlayer = ai;\n    } else if (currentPlayer === ai) {\n      if (ai.gameBoard.allShipsSunk()) {\n        isGameOver = true;\n        return 'Ai Wins!';\n      }\n      const result = ai.attackEnemyGameBoard();\n      console.log('Ai turn:', result);\n      currentPlayer = p1;\n    }\n  }\n};\n\nmodule.exports = gameLoop;\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

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

eval("const createShip = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst createGameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst { createPlayer, createAi } = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst gameLoop = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n// const ship = createShip('submarine', 3);\n// const gb = createGameBoard();\n// const ai = createAi(gb);\nconsole.log(gameLoop('Jeff'));\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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