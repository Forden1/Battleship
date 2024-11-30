export function displayGrid(gameboard,name){
    const board=document.getElementById(name)
    console.log
    console.log("sdasd")
    console.log(gameboard)
    for(let row=0;row<gameboard.size;row++){
        for(let col=0;col<gameboard.size;col++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            if(gameboard.board[row][col]=='ship'){
                cell.classList.add('ship');
            }
            else if(gameboard.board[row][col]=='hit'){
                cell.classList.add('hit')
            }
            else if(gameboard.board[row][col]=='miss'){
                cell.classList.add('miss')
            }
            board.appendChild(cell);
        }
    

    }
}

