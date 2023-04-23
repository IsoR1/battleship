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

const renderGameBoardGrid = (gameBoard) => {
  const containerDiv = createEl('div', 'container-div');
  let rowId = 0;
  let colId = 0;
  for (let i = 0; i < gameBoard.grid.length; i++) {
    const rowDiv = createEl('div', 'row-div');
    rowDiv.setAttribute('data-row-id', rowId);
    rowId += 1;
    colId = 0;
    for (let j = 0; j < gameBoard.grid[i].length; j++) {
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

// const createShipPlacementContainer = () => {
//   const mainConDiv = createEl('div', 'placement-container');
//   const header = createEl('h3', 'placement-header');
//   header.textContent = 'Place your ships!';

//   mainConDiv.appendChild(header);

//   return mainConDiv;
// };

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
  options.forEach((option) => {
    const [label, input] = createInputLabel(option);
    input.setAttribute('type', 'radio');
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
  });
  return checkboxes;
};

const createPlaceShipButton = () => {
  const placeShipDiv = createEl('div', 'place-ship-div');
  const placeShipButton = createEl('button', 'place-ship-button');
  placeShipButton.innerText = 'Place ships!';
  placeShipDiv.appendChild(placeShipButton);
  return placeShipDiv;
};

const leftSidePlaceShips = () => {
  const placementDiv = createEl('div', 'ship-placement-container');
  const placementH3 = createEl('h3', 'ship-placement-h3');
  placementH3.textContent = 'Place your ships!';

  const formDiv = createEl('div', 'ship-placement-form-div');
  const form = createEl('form', 'ship-placement-form');

  const underFormDiv = createEl('div', 'ship-placement-under-form');
  const alignmentP = createEl('p', 'alignment-p');
  alignmentP.textContent = 'Choose your alignment:';

  const radioGroup = createShipRadioGroup();
  const checkboxes = createShipCheckboxes();
  const placeShipButton = createPlaceShipButton();

  placementDiv.append(placementH3);
  formDiv.append(form);
  form.append(underFormDiv);
  underFormDiv.append(alignmentP, radioGroup, checkboxes, placeShipButton);
  placementDiv.append(formDiv);

  return placementDiv;
};

const createMainContent = (gameBoard) => {
  const gameBoardDiv = createEl('div', 'game-board-div');
  const underHeaderDiv = createEl('div', 'main-body-div');
  const placementDivs = leftSidePlaceShips();
  // const placementForm = shipPlacementForm();

  const renderGameGrid = renderGameBoardGrid(gameBoard);
  container.appendChild(underHeaderDiv);
  underHeaderDiv.appendChild(placementDivs);
  underHeaderDiv.appendChild(gameBoardDiv);
  gameBoardDiv.appendChild(renderGameGrid);
  // placementDivs.appendChild(placementDivs);
};

module.exports = { renderHeader, createForm, createMainContent };
