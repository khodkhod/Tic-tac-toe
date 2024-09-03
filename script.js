const boxess = document.querySelectorAll('.boxes');
const statusText = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxess.forEach(boxes => boxes.addEventListener('click', handleboxesClick));
restartBtn.addEventListener('click', restartGame);

function handleboxesClick(event) {
    const boxes = event.target;
    const index = boxes.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    boxes.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(boxes => boxes !== '')) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    boxess.forEach(boxes => (boxes.textContent = ''));
}
