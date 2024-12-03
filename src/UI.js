export function displayGrid(gameboard,name){
    const board=document.getElementById(name)
    board.innerHTML = '';
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
const ships = document.querySelectorAll('.Sship');
const grid = document.getElementById('start-board')

let offsetX = 0, offsetY = 0, startX = 0, startY = 0;
let activeShip = null;

ships.forEach(ship => {
  ship.addEventListener('mousedown', mouseDown);
});



function mouseDown(e) {
    e.preventDefault();
    activeShip = e.target.parentElement
  
    // Dynamically make the ship absolute and retain its position

  
    activeShip.style.position = 'absolute';

    startX = e.clientX;
    startY = e.clientY;
    
  
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }
  function mouseMove(e) {
    if (!activeShip) return;
  
    // Update ship position
    const x = e.clientX 
    const y = e.clientY ;
  
    activeShip.style.left = `${x}px`;
    activeShip.style.top = `${y}px`;
  }

function mouseUp(e) {
    if (!activeShip) return;

    // Remove event listeners for mouse move and mouse up
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    // Optional: Update the gameboard to reflect the new ship position
    // After the ship is dropped, update the grid with the ship's new position.

    activeShip = null;
}