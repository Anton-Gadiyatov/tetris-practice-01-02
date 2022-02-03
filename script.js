const main = document.querySelector('.main');

const playfield = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let gameSpeed = 400;

const draw = () => {
  let mainInnerHTML = '';
  playfield.forEach((row) => {
    row.forEach((cell) => {
      if (cell === 1) {
        mainInnerHTML += `<div class='cell moving-cell'></div>`;
      } else {
        mainInnerHTML += `<div class='cell'></div>`;
      }
    });
  });

  main.innerHTML = mainInnerHTML;
};

const canTetroMoveDown = () => {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        if (y === playfield.length - 1) {
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
          playfield[y][x] = 0;
          playfield[y + 1][x] = 1;
        }
      }
    }
  }
};

draw();

const startGame = () => {
  moveTetroDown();
  draw();
  setTimeout(startGame, gameSpeed);
};

setTimeout(startGame, gameSpeed);
