import { firstBoardClickHandler, rotation } from "./GameController";
import { shipRotation } from "./GameController";
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
export function displayOPPGrid(gameboard,name){
    const board=document.getElementById(name)
    board.innerHTML = '';
    for(let row=0;row<gameboard.size;row++){
        for(let col=0;col<gameboard.size;col++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            if(gameboard.board[row][col]=='ship'){
                cell.classList.add('oship');
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

grid.addEventListener
ships.forEach(ship => {
  ship.addEventListener('click', click);
});
ships.forEach(ship => {
    ship.addEventListener('contextmenu', rightclick);
  });
  
function rightclick(e){
    e.preventDefault();
    activeShip = e.target.closest('.Sship');
    console.log(activeShip)
    const computedStyles = window.getComputedStyle(activeShip);
    const currentWidth = computedStyles.width;

    const currentHeight = computedStyles.height;
    console.log(`${currentWidth}wide and ${currentHeight}long`)
    activeShip.style.width = `${parseFloat(currentHeight)}px`;
    activeShip.style.height = `${parseFloat(currentWidth)}px`;
    activeShip.style.flexBasis = `${currentHeight}px`;
    console.log(`${activeShip.style.width}wide and ${ activeShip.style.height}long`)
        shipRotation(activeShip.id)
    if (activeShip.classList.contains('horizontal')) {
        activeShip.classList.remove('horizontal');
        activeShip.classList.add('vertical');
    } else {
        activeShip.classList.remove('vertical');
        activeShip.classList.add('horizontal');
    }
}
function click(e) {
    e.preventDefault();
    activeShip = e.target.closest('.Sship');
  
    // Dynamically make the ship absolute and retain its position

    activeShip.style.pointerEvents = 'none';
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
    if (e.button === 2) {
        return; // Ignore right-clicks
    }

    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    const originalPosition = activeShip.getBoundingClientRect(); // Save the original position of the ship div
    const success = firstBoardClickHandler(dropTarget, activeShip.id);
    if (dropTarget && dropTarget.className === 'cell'&&success===true) {
        
        
        grid.removeEventListener('mousemove', mouseMove);
        grid.removeEventListener('mouseup', mouseUp);
        console.log("succefull remove dem bitched")
    
    } else {
        console.error("Invalid drop target. Returning ship to its original position.");
        const originalPosition = activeShip.getBoundingClientRect();
        
        activeShip.style.left = `${startX}px`;
        activeShip.style.top = `${startY}px`;
        activeShip.style.position = '';
        activeShip.style.pointerEvents='';
    }


    activeShip = null;
} 