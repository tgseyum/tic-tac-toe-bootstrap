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
let scores = { X: 0, O: 0, draws: 0 };

function getGameElements() {
  return {
    cells: Array.from(document.querySelectorAll('.cell')),
    statusText: document.getElementById('status-text'),
    restartButton: document.getElementById('restart-button'),
    scoreX: document.getElementById('score-x'),
    scoreO: document.getElementById('score-o'),
    scoreDraws: document.getElementById('score-draws'),
  };
}

function updateScores() {
  const { scoreX, scoreO, scoreDraws } = getGameElements();
  if (scoreX) scoreX.textContent = String(scores.X);
  if (scoreO) scoreO.textContent = String(scores.O);
  if (scoreDraws) scoreDraws.textContent = String(scores.draws);
}

function setStatus(message) {
  const { statusText } = getGameElements();
  if (statusText) statusText.textContent = message;
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

function setBoardDisabled(disabled) {
  const { cells } = getGameElements();
  cells.forEach((cell) => {
    cell.disabled = disabled;
  });
}

function handleWin(winner) {
  gameOver = true;
  scores[winner] += 1;
  updateScores();
  setStatus(`Player ${winner} wins!`);
  setBoardDisabled(true);
}

function handleDraw() {
  gameOver = true;
  scores.draws += 1;
  updateScores();
  setStatus("It's a draw!");
  setBoardDisabled(true);
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Player ${currentPlayer}'s turn`);
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);
  const { cells } = getGameElements();

  if (!cell || board[index] || gameOver) {
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

  const { cells } = getGameElements();
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.disabled = false;
  });

  setStatus("Player X's turn");
}

function initGame() {
  const { cells, restartButton } = getGameElements();

  if (!cells.length || !restartButton) {
    return;
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', resetBoard);
  updateScores();
  setStatus("Player X's turn");
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
