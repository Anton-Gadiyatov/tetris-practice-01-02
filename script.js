const main = document.querySelector('.main');

const playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
];

let gameSpeed = 400;

const draw = () => {
  let mainInnerHTML = '';
  playfield.forEach((row) => {
    row.forEach((cell) => {
      if (cell === 1) {
        mainInnerHTML += `<div class='cell moving-cell'></div>`;
      } else if (cell === 2) {
        mainInnerHTML += `<div class='cell fixed-cell'></div>`;
      } else {
        mainInnerHTML += `<div class='cell'></div>`;
      }
    });
  });

  main.innerHTML = mainInnerHTML;
};

// Движение фигурки влево

const canTetroMoveLeft = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === 0 || playfield[y][x - 1] === 2) {
          return false;
        }
      }
    }
  }
  return true;
};

const moveTetroLeft = () => {
  if (canTetroMoveLeft()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] === 1) {
          playfield[y][x - 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
};

// Движение фигурки вправо

const canTetroMoveRight = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (x === playfield[0].length - 1 || playfield[y][x + 1] === 2) {
          return false;
        }
      }
    }
  }
  return true;
};

const moveTetroRight = () => {
  if (canTetroMoveRight()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = playfield[y].length - 1; x >= 0; x--) {
        if (playfield[y][x] === 1) {
          playfield[y][x + 1] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  }
};

// Движение фигурки вниз

const canTetroMoveDown = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (y === playfield.length - 1 || playfield[y + 1][x] === 2) {
          return false;
        }
      }
    }
  }
  return true;
};

const moveTetroDown = () => {
  if (canTetroMoveDown()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      for (let x = playfield[y].length - 1; x >= 0; x--) {
        if (playfield[y][x] === 1) {
          playfield[y + 1][x] = 1;
          playfield[y][x] = 0;
        }
      }
    }
  } else {
    fixTetro();
  }
};

// Удаление готовой линии

const checkFullLines = () => {
  for (let y = 0; y < playfield.length; y++) {
    let canRemoveLine = true;
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        canRemoveLine = false;
        return;
      }
    }
    if (canRemoveLine) {
      playfield.splice(y, 1);
      playfield.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }
};

// Фиксация фигурки

const fixTetro = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }

  checkFullLines();

  playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
};

draw();

document.onkeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    moveTetroLeft();
  } else if (e.key === 'ArrowRight') {
    moveTetroRight();
  } else if (e.key === 'ArrowDown') {
    moveTetroDown();
  }
  draw();
};

const startGame = () => {
  moveTetroDown();
  draw();
  setTimeout(startGame, gameSpeed);
};

setTimeout(startGame, gameSpeed);
