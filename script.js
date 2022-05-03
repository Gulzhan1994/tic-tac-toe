"use strict";

var restart = document.querySelector('.game--restart');
var cell = document.querySelectorAll('.cell');


// Первый шаг - нажимаем кнопку Restart Game и начинаем игру;
// Второй шаг - Два игрока между собой поделить именно кто будет заполнять клетку игрового поля крестиком или ноликом;
// Третий шаг - Два игрока по очереди заполняет игровую полу Х или 0;
// Четвертий шаг - Если во время игры у одного из игроков по вертикали, по горизонтали или по диагоналу все одинако совпадает, 
//тот и человек выигрывает; а если все запонены но не совпадает тогда - ничья;


let currentPlayer = 'X';
let gameActive = true;
const drawMessage = 'Game ended in a draw!';
const winningMessage = () => `Player ${currentPlayer} has won!`;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    let indexCell = event.target.dataset.cellIndex;
    if(!gameActive || gameState[indexCell] !== '') {
        return;
    } 
    gameState[indexCell] = currentPlayer;
    cell[indexCell].textContent = currentPlayer;

    handleResultValidation();
        
}

function handlePlayerChange(event) {
    let gameStatus = document.querySelector('.game--status');
    currentPlayer === "X" ? currentPlayer = "0" : currentPlayer = "X";
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleResultValidation() {
    for(let i = 0; i <=winningLines.length - 1; i++) {
        const winCondition = winningLines[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '') {
            continue;
        }
        if(a === b && b === c && c === a) {
            alert(winningMessage());
            gameActive = false;
            break;
        }
    }
    if(!gameState.includes('')) {
        alert(drawMessage);
        gameActive = false;
    }
    handlePlayerChange();
}

function handleRestartGame() {
    for(let i = 0; i < cell.length; i++) {
        cell[i].textContent = '';
    }
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];

}

cell.forEach(cell => cell.addEventListener('click',handleCellClick));


restart.addEventListener('click', handleRestartGame);