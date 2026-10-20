const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status-text');
const restartButton = document.getElementById('restart-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraws = document.getElementById('score-draws');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let scores = {
  X: 0,
  O: 0,
  draws: 0,
};

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraws.textContent = scores.draws;
}

function setStatus(message) {
  statusText.textContent = message;
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function handleWin(winner) {
  gameOver = true;
  scores[winner] += 1;
  updateScores();
  setStatus(`Player ${winner} wins!`);

  cells.forEach((cell) => {
    if (!cell.disabled) {
      cell.disabled = true;
    }
  });
}

function handleDraw() {
  gameOver = true;
  scores.draws += 1;
  updateScores();
  setStatus("It's a draw!");

  cells.forEach((cell) => {
    if (!cell.disabled) {
      cell.disabled = true;
    }
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Player ${currentPlayer}'s turn`);
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winner = checkWinner();

  if (winner) {
    handleWin(winner);
    return;
  }

  if (board.every((value) => value !== '')) {
    handleDraw();
    return;
  }

  switchPlayer();
}

function resetBoard() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.disabled = false;
  });

  setStatus("Player X's turn");
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetBoard);

updateScores();
setStatus("Player X's turn");
