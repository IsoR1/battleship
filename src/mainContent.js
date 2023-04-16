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

const createMainContent = () => {
  const battleshipTag = createBattleshipDiv();
  const gameBoardDiv = createEl('div', 'game-board-div');
  const formDiv = createFormElems();

  container.append(battleshipTag);
  container.appendChild(gameBoardDiv);
  gameBoardDiv.appendChild(formDiv);
};

module.exports = createMainContent;
