import { Player } from "./Player";
import { GameBoard } from "./Gameboard";
// GameController.js
export function renderShip(div){
    const ship=document.getElementById(`${div}`)
    const length=ship.dataset.length

    for(let i=0;i<length;i++){
        const cell=document.createElement('div');
        cell.classList.add('cell')
        cell.classList.add('ship')
        ship.appendChild(cell)
    }
}
export function handleClick(cell,row,col,player){
    if (cell.classList.contains('ship')){
        cell.classList.remove("ship")
        const newCell = document.createElement('div');
        newCell.classList.add("cell")
        newCell.classList.add("hit")
        cell.appendChild(newCell)
        let board=oppBoard(player)
        
        board[row][col]='hit'
        console.log(board)

    }
    else if(!cell.classList.contains('hit')&&!cell.classList.contains('miss')){
        const newCell = document.createElement('div');
        newCell.classList.add("cell")
        newCell.classList.add("miss")
        cell.appendChild(newCell)
        let board=oppBoard(player)
        board[row][col]='miss'
        console.log(board)
    }
}

export function setupBoardClickHandler(boardId,player) {
    const board = document.getElementById(boardId);

    if (!board) {
        console.error(`Board with id "${boardId}" not found`);
        return;
    }

    board.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains('cell')) {
            console.log(`you done dii clicked ${event.target}`)
            const row = event.target.dataset.row;
            const col = event.target.dataset.col;
            console.log(event.target,row,col,player)
            handleClick(event.target,row,col,player)
        }
    });
}
export function oppBoard(player){
     console.log(`${player}`)
    return player.gameboard.board

}
