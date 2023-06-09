/* eslint-disable quote-props */
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
  nameLabel.textContent = 'Name:';
  nameInput.setAttribute('id', 'player-name');
  nameButton.setAttribute('type', 'submit');
  nameButton.innerText = 'Play game';

  nameInputForm.appendChild(nameLabel);
  nameInputForm.appendChild(nameInput);
  nameInputForm.appendChild(nameButton);
  nameFormDiv.appendChild(nameInputForm);

  return nameFormDiv;
};

const renderGameBoardGrid = (gameBoard) => {
  const containerDiv = createEl('div', 'container-div');
  let rowId = 0;
  let colId = 0;
  for (let i = 0; i < gameBoard.grid.length; i += 1) {
    const rowDiv = createEl('div', 'row-div');
    rowDiv.setAttribute('data-row-id', rowId);
    rowId += 1;
    colId = 0;
    for (let j = 0; j < gameBoard.grid[i].length; j += 1) {
      const colDiv = createEl('div', 'col-div');
      colDiv.setAttribute('data-col-id', colId);
      colDiv.setAttribute('data-row-id', rowDiv.getAttribute('data-row-id'));
      colId += 1;
      rowDiv.appendChild(colDiv);
    }
    containerDiv.appendChild(rowDiv);
  }
  return containerDiv;
};

const renderHeader = () => {
  const battleshipTag = createBattleshipDiv();
  container.append(battleshipTag);
};

const createForm = () => {
  const formDiv = createFormElems();
  container.appendChild(formDiv);
};

const createInputLabel = (name) => {
  const label = createEl('label');
  label.textContent = name;
  label.setAttribute('for', name.toLowerCase());

  const input = createEl('input');
  input.setAttribute('id', name.toLowerCase());

  return [label, input];
};

const createShipRadioGroup = () => {
  const radioGroup = createEl('div', 'ship-alignment-options');
  const options = ['Vertical', 'Horizontal'];
  const name = 'alignment';
  options.forEach((option) => {
    const [label, input] = createInputLabel(option);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', name);
    input.setAttribute('value', option.toLowerCase());
    radioGroup.appendChild(label);
    radioGroup.appendChild(input);
  });
  return radioGroup;
};

const createShipCheckboxes = () => {
  const checkboxes = createEl('div', 'ships-list');
  const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
  ships.forEach((ship) => {
    const [label, input] = createInputLabel(ship);
    checkboxes.appendChild(label);
    checkboxes.appendChild(input);
    input.setAttribute('pattern', '[0-9]');
  });
  return checkboxes;
};

const createPlaceShipButton = () => {
  const placeShipDiv = createEl('div', 'place-ship-div');
  const placeShipButton = createEl('button', 'place-ship-button');
  placeShipButton.innerText = 'Place ship!';
  placeShipDiv.appendChild(placeShipButton);
  return placeShipDiv;
};

const leftSidePlaceShips = () => {
  const placementDiv = createEl('div', 'ship-placement-container');
  const placementH3 = createEl('h3', 'ship-placement-h3');
  placementH3.textContent = 'Place your ships!';

  const formDiv = createEl('div', 'ship-placement-form-div');
  const form = createEl('form', 'ship-placement-form');

  const alignmentP = createEl('p', 'alignment-p');
  alignmentP.textContent = 'Choose your alignment:';

  const radioGroup = createShipRadioGroup();
  const checkboxes = createShipCheckboxes();
  const placeShipButton = createPlaceShipButton();

  placementDiv.append(placementH3);
  formDiv.append(form);
  form.append(alignmentP, radioGroup, checkboxes, placeShipButton);
  placementDiv.append(formDiv);

  return placementDiv;
};

const createAttackInstructions = () => {
  const div = createEl('div', 'attack-instructions-div');
  const h2 = createEl('h2', 'attack-instructions-h2');
  h2.textContent = 'Click a square to attack it';
  div.appendChild(h2);
  return div;
};

const createAttackResultsContainer = () => {
  const div = createEl('div', 'attack-results-div');
  const h3 = createEl('h3', 'attack-results-h3');

  div.appendChild(h3);

  return div;
};

const updateAttackResult = (player, attack) => {
  const h3 = document.querySelector('.attack-results-h3');
  h3.textContent = `${player.substring(0, 1).toUpperCase() + player.substring(1)}'s attack: ${attack}`;
};

const removeH2Div = () => {
  const div = document.querySelector('.attack-instructions-div');
  const h3 = document.querySelector('.attack-results-h3');
  div.remove();
  h3.style.fontSize = '2rem';
};

const winningMessage = (winner) => {
  const h3 = document.querySelector('.attack-results-h3');
  if (winner === 0) {
    h3.textContent = "It's a draw!";
  }
  h3.textContent = `${winner} wins!`;
};

const createMainContent = (gameBoard) => {
  const gameBoardDiv = createEl('div', 'game-board-div');
  const underHeaderDiv = createEl('div', 'main-body-div');
  const placementDivs = leftSidePlaceShips();
  // const hitMissDiv = createHitMissText();

  const renderGameGrid = renderGameBoardGrid(gameBoard);
  container.appendChild(underHeaderDiv);
  underHeaderDiv.appendChild(placementDivs);
  // underHeaderDiv.appendChild(hitMissDiv);
  underHeaderDiv.appendChild(gameBoardDiv);
  gameBoardDiv.appendChild(renderGameGrid);
};

module.exports = {
  renderHeader,
  createForm,
  createAttackInstructions,
  createAttackResultsContainer,
  updateAttackResult,
  winningMessage,
  removeH2Div,
  createMainContent,
};
