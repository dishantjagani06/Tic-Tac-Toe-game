document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let cells = Array.from(document.getElementsByClassName('cell'));
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

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

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.backgroundColor = '#2980b9';
        
        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Current player: ${currentPlayer}`;
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Current player: ${currentPlayer}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#3498db';
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
