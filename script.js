const BOARD_SIZE = 8;
const SNAKE_SIZE = 2;
const DIRECTION_TYPES = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
};

const init = () => {
  const board = [];
  let treat;
  snake = {
    path: [
      [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
      [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2) + 1],
    ],
    head: [Math.floor(BOARD_SIZE / 2), Math.floor(BOARD_SIZE / 2)],
    direction: null,
    length: SNAKE_SIZE,
  };

  for (let i = 0; i < BOARD_SIZE; ++i) {
    board.push([]);
    for (let j = 0; j < BOARD_SIZE; ++j) {
      board[i].push(0);
    }
  }
  createBoard(board);
  treat = placeTreat(board);
  createSnake(snake, "RIGHT");

  document.addEventListener("keydown", (e) => handleKeyDown(e, snake));
};

// create board
const createBoard = (board) => {
  const root = document.getElementById("root");
  const fragment = document.createDocumentFragment();

  board.map((row, rowId) => {
    const rowEl = document.createElement("div");
    rowEl.id = rowId;
    rowEl.classList.add("row");
    row.map((cell, cellId) => {
      const cellEl = document.createElement("div");
      cellEl.id = `${rowId}_${cellId}`;
      cellEl.classList.add("cell");
      rowEl.appendChild(cellEl);
    });
    fragment.appendChild(rowEl);
  });
  root.append(fragment);
};

// place treat
const placeTreat = () => {
  const randomRow = Math.floor(Math.random() * BOARD_SIZE);
  const randomCol = Math.floor(Math.random() * BOARD_SIZE);
  const treat = document.createElement("span");
  treat.innerText = "X";
  treat.id = "treat";
  const cellEl = document.getElementById(`${randomRow}_${randomCol}`);
  //   console.log(`${randomRow}_${randomCol}`, cellEl);
  cellEl.appendChild(treat);
  return randomRow, randomCol;
};

// create snake
const createSnake = (snake, direction) => {
  switch (direction) {
    case DIRECTION_TYPES.RIGHT:
      if (direction !== DIRECTION_TYPES.LEFT) moveRight(snake);
    case DIRECTION_TYPES.LEFT:
      if (direction !== DIRECTION_TYPES.RIGHT) moveLeft(snake);
    case DIRECTION_TYPES.UP:
      if (direction !== DIRECTION_TYPES.DOWN) moveUp(snake);
    case DIRECTION_TYPES.DOWN:
      if (direction !== DIRECTION_TYPES.UP) moveDown(snake);
  }
  renderSnake(snake);
};

const renderSnake = (snake) => {
  for (let i = 0; i < snake.length; i++) {
    const [row, col] = snake.path[i];
    const cellEl = document.getElementById(`${row}_${col}`);
    if (!cellEl.classList.contains("snake")) cellEl.classList.add("snake");
  }
};

const moveLeft = (snake) => {
  snake.path.unshift([snake.path[0][0], snake.path[0][1] - 1]);
  snake.head = snake.path[0];
  if (!shouldEat) {
    const [removeRow, removeCell] = snake.path.pop();
    console.log(snake.path);
    const removeEl = document.getElementById(`${removeRow}_${removeCell}`);
    removeEl.classList.remove("snake");
  }
  renderSnake(snake);
};

const moveRight = (snake) => {
  console.log(snake);
  snake.path.unshift([snake.path[0][0], snake.path[0][1] + 1]);
  snake.head = snake.path[0];
  if (!shouldEat) {
    const [removeRow, removeCell] = snake.path.pop();
    const removeEl = document.getElementById(`${removeRow}_${removeCell}`);
    removeEl.classList.remove("snake");
  }
  renderSnake(snake);
};

const moveUp = (snake) => {
  snake.path.unshift([snake.path[0][0] - 1, snake.path[0][1]]);
  snake.head = snake.path[0];
  if (!shouldEat) {
    const [removeRow, removeCell] = snake.path.pop();
    const removeEl = document.getElementById(`${removeRow}_${removeCell}`);
    removeEl.classList.remove("snake");
  }
  renderSnake(snake);
};

const moveDown = (snake) => {
  snake.path.unshift([snake.path[0][0] + 1, snake.path[0][1]]);
  snake.head = snake.path[0];
  if (!shouldEat) {
    const [removeRow, removeCell] = snake.path.pop();
    const removeEl = document.getElementById(`${removeRow}_${removeCell}`);
    removeEl.classList.remove("snake");
  }
  renderSnake(snake);
};

const shouldEat = () => {
  const treat = document.getElementById("treat");
  const head = document.getElementById(`${snake.head[0]}_${snake.head[1]}`);
  return head === treat;
};

const handleKeyDown = (e, snake) => {
  switch (e.keyCode) {
    case 37:
      moveLeft(snake);
      break;
    case 38:
      moveUp(snake);
      break;
    case 39:
      moveRight(snake);
      break;
    case 40:
      moveDown(snake);
      break;
    default:
      console.error("Invalid key pressed");
  }
};

init();
