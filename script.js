// Current player ('X' or 'O')
let currentPlayer = 'X';
// The game board, initialized as an empty 3x3 grid
let board = ['','','','','','','','',''];
// Flag to track if the game is over
let gameOver = false;

const cells = document.querySelectorAll(".cell");

const restartButton = document.querySelector("button");

const winner = document.getElementById("winner");


function checkWinner(){
    const winPatterns = [[0,1,2],[3,4,5],[6,7,8], //rows
                        [0,3,6],[1,4,7],[2,5,8],  //columns
                        [0,4,8],[2,4,6]           //Diagonals.
                    ];

    for(let pattern of winPatterns){
        const [a,b,c] = pattern;

        if(board[a] && board[a]===board[b] && board[a]===board[c]){
            return true;
        }
    }
    return false;
}


function handleCellClick(event){
    const clickCell = event.target;
    
    const cellIndex = clickCell.getAttribute("data-cell-index");

    if(board[cellIndex]!=='' || gameOver){
        return;
    }

    clickCell.textContent = currentPlayer;

    board[cellIndex] = currentPlayer;

    if(checkWinner()){
        winner.innerHTML = '${currentPlayer} wins!';
        gameOver = true;
        return;
    }

    if(board.every(cell => cell !== '')){
        winner.innerHTML = `It\'s a draw!`;
    }

    currentPlayer = currentPlayer==='X' ? 'O':'X';

}

cells.forEach(cell=>{
    cell.addEventListener("click",handleCellClick);
});

//Add the eventListener to restart.

function restart(){
    board = ['','','','','','','','',''];

    cells.forEach(cell=>{
        cell.textContent='';
    });

    currentPlayer = 'X';

    gameOver = false;

    winner.innerHTML = '';
}

restartButton.addEventListener("click",restart);