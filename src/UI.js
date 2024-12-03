export function displayGrid(gameboard,name){
    const board=document.getElementById(name)

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
    activeShip = e.target;
  
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
  
  function mouseUp() {
    // if (!activeShip) return;
  
    // // Snap to grid
    // const gridRect = grid.getBoundingClientRect();
    // const shipRect = activeShip.getBoundingClientRect();
  
    // // Calculate nearest grid cell
    // const gridX = Math.round((shipRect.left - gridRect.left) / 50) * 50; // 50 is cell size
    // const gridY = Math.round((shipRect.top - gridRect.top) / 50) * 50;
  
    // // Ensure ship stays within grid bounds
    // const maxX = gridRect.width - shipRect.width;
    // const maxY = gridRect.height - shipRect.height;
  
    // const finalX = Math.max(0, Math.min(gridX, maxX));
    // const finalY = Math.max(0, Math.min(gridY, maxY));
  
    // activeShip.style.left = `${finalX + gridRect.left}px`;
    // activeShip.style.top = `${finalY + gridRect.top}px`;
  
    // // Cleanup
    // document.removeEventListener('mousemove', mouseMove);
    // document.removeEventListener('mouseup', mouseUp);
    // activeShip = null;
  }

