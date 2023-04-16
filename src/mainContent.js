const container = document.querySelector('.container');
const createEl = (tag, className = '') => {
  const el = document.createElement(tag);
  if (className) {
    el.classList.add(className);
  }
  return el;
};

const createBattleshipDiv = () => {
  const battleShipDiv = createEl('div', 'battleship-h1-div');
  const battleshipTag = createEl('h1', 'battleship-tag');
  battleshipTag.textContent = 'BATTLESHIP';
  battleShipDiv.appendChild(battleshipTag);
  return battleShipDiv;
};

const createFormElems = () => {
  const nameFormDiv = createEl('div', 'name-input-div');
  const nameInputForm = createEl('form');
  const nameLabel = createEl('label', 'name-label');
  const nameInput = createEl('input');
  const nameButton = createEl('button', 'name-button');
  nameInputForm.setAttribute('id', 'name-form-id');
  nameLabel.setAttribute('for', 'player-name');
  nameLabel.textContent = 'First Name:';
  nameInput.setAttribute('id', 'player-name');
  nameButton.setAttribute('type', 'submit');
  nameButton.innerText = 'Play game';

  nameInputForm.appendChild(nameLabel);
  nameInputForm.appendChild(nameInput);
  nameInputForm.appendChild(nameButton);
  nameFormDiv.appendChild(nameInputForm);

  return nameFormDiv;
};

// const renderGameBoardGrid = (gameBoard) => {
//   for (let i = 0; i < gameBoard.grid.length; i++) {
//     const rowDiv = createEl('div', 'row-div');
//     for (let j = 0; j < gameBoard.grid[i].length; j++) {
//       const colDiv = createEl('div', 'col-div');
//       rowDiv.appendChild(colDiv);
//     }
//     return rowDiv;
//   }
// };

const renderHeader = () => {
  const battleshipTag = createBattleshipDiv();
  container.append(battleshipTag);
};

const createForm = () => {
  const formDiv = createFormElems();
  // gameBoardDiv.appendChild(formDiv);
  container.appendChild(formDiv);
};

const createMainContent = (gameBoard) => {
  const gameBoardDiv = createEl('div', 'game-board-div');

  // const renderGameGrid = renderGameBoardGrid(gameBoard);
  container.appendChild(gameBoardDiv);
  // gameBoardDiv.appendChild(renderGameGrid);
};

module.exports = { renderHeader, createForm, createMainContent };
