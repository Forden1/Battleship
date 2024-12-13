import { Player } from "./Player";
import { GameBoard } from "./Gameboard";
import {shipMap }from './shipRegistry';
import { player1 } from './index.js';
import { player2 } from "./index.js";
import { displayGrid } from "./UI.js";
import { displayOPPGrid } from "./UI.js";
// GameController.js
let turn=0
export function statusUpdate(){
    
}
export function ai() {
    let row, col, result;

    const boardElement = document.getElementById('player1-board');  // Reference to the DOM element representing player1's board

    // Check if there are pending hit targets to follow up on
    if (player1.gameboard.hitTargets.length > 0) {
        [row, col] = player1.gameboard.hitTargets.shift(); // Get the next target from the queue
    } else {
        // Randomly choose a new target, avoiding already-attacked positions
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (
            player1.gameboard.hits.some(hit => hit[0] === row && hit[1] === col)
        );
    }

    console.log(`AI targeting row ${row}, col ${col}`);

    // Scope DOM search to only the correct board
    const cell = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if (cell) {
        result = handleClick(cell, row, col, player1);
        player1.gameboard.hits.push([row,col])
        if (result === 'Hittt!') {
            addAdjacentTargets(row, col, player1.gameboard);
        }
        console.log(`AI attacked (${row}, ${col}) and result was: ${result}`);
    }
}


export function addAdjacentTargets(row, col, gameboard) {
    const directions = [
        [row - 1, col], // Top
        [row + 1, col], // Bottom
        [row, col - 1], // Left
        [row, col + 1], // Right
    ];

    for (const [r, c] of directions) {
        // Ensure the target is within bounds and not already attacked
        if (
            r >= 0 &&
            r < 10 &&
            c >= 0 &&
            c < 10 &&
            !gameboard.hits.some(hit => hit[0] === r && hit[1] === c) &&
            !gameboard.hitTargets.some(target => target[0] === r && target[1] === c)
        ) {
            gameboard.hitTargets.push([r, c]); // Add valid adjacent cells to the queue
        }
    }
    console.log(`helllo this is the adejecent shit ${gameboard.hitTargets}`)
}


export function renderShip(div){
    const shipDiv=document.getElementById(`${div}`)
    const ship=shipMap.get(div)
    const length=ship.length

    for(let i=0;i<length;i++){
        const cell=document.createElement('div');
        cell.classList.add('cell')
        cell.classList.add('ship')
        shipDiv.appendChild(cell)
    }
    console.log(`renderd ships${div}`)
  
}
export function handleClick(cell, row, col, player) {
    // Get the player's game board
    let board = ownBoard(player);

    // Use the receiveAttack method on the player's gameboard
    const result = player.gameboard.receiveAttack([row, col]);

    
    if (result === "Invalid spot: out of bounds." || result === "Invalid spot: already attacked.") {
        alert(result); 
        return;
    }

    // Create a new cell for hit or miss
    const newCell = document.createElement('div');
    newCell.dataset.row=cell.dataset.row
    newCell.dataset.col=cell.dataset.col
    newCell.classList.add("cell");

    if (board[row][col] === "hit") {
        newCell.classList.add("hit");
    } else if (board[row][col] === "miss") {
        newCell.classList.add("miss");
    }

    // Add the visual indicator to the clicked cell
    cell.appendChild(newCell);
    alert(result)
    turn = turn == 0 ? 1 : 0;
if (turn == 1) {
    console.log("Switching to AI turn");
    setTimeout(ai, 500);  // Adding a slight delay to ensure DOM updates
}

    // if (result.startsWith("Hit")) {
    //     console.log(result);
    // } else if (result === "MISS!!!!") {
    //     console.log(result);
    // }
    return result
}

export function shipRotation(id){
    const ship=shipMap.get(id);
    
    ship.direction = ship.direction === 'horizontal' ? 'vertical' : 'horizontal';

   
    

}
let totalShips = 5; // Total number of ships
let placedShips = 0; // Counter for placed ships


function switchToMainGame(){
    const startBoard=document.getElementById(`start-board`)
    const ships=document.getElementById(`initial`)
    const board1=document.getElementById('player1-board')
    const board2=document.getElementById('player2-board')
    const main=document.getElementById('main')
    main.classList.remove('main')
    main.classList.add('main2')

    board1.classList.remove('hidden')
    board2.classList.remove('hidden')
    startBoard.style.display = 'none';
    ships.style.display = 'none';
    displayGrid(player1.gameboard,'player1-board')
    displayOPPGrid(player2.gameboard,'player2-board')
}


function placeShip() {
    placedShips++;
   
    if (placedShips === totalShips) {
        console.log('all ship placed');
        switchToMainGame()
    }
}
export function firstBoardClickHandler(target, id) {
    console.log("First board click handler triggered.");
    console.log(`${target}`);
    const ship = shipMap.get(id);
    console.log(`${ship}`);

    // Ensure the clicked element is a cell with the required dataset attributes
    if (target) {
        const row = parseInt(target.dataset.row, 10);
        const column = parseInt(target.dataset.col, 10);

        console.log(`You pressed cell with row ${row} and column ${column}`);

        try {
            let coordinates = player1.gameboard.numToLetter(row, column);
            const success = player1.gameboard.placeShip(ship, coordinates, ship.length, ship.direction);

            if (success===true) {
                console.log(`Ship placed successfully at row: ${row}, column: ${column}`);
                console.log(player1.gameboard.board);
                displayGrid(player1.gameboard, 'start-board');
                placeShip()

                // Hide the ship div after successful placement
                const shipDiv = document.getElementById(id); // Assuming ship div has id matching the ship's id
                if (shipDiv) {
                    shipDiv.style.display = 'none';
                }
            } else {
                // Log message if placement fails
                console.error("Ship placement failed: Invalid position.");
                return false; // Indicate failure
            }
        } catch (error) {
            console.error("Error while placing the ship:", error);
            return false; // Indicate failure
        }
    }
    return true; // Indicate success
}

export function setupBoardClickHandler(boardId,player) {
    const board = document.getElementById(boardId);

    if (!board) {
       
        return;
    }

    board.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains('cell')) {
           
            const row = event.target.dataset.row;
            const col = event.target.dataset.col;
           
            handleClick(event.target,row,col,player)
        }
    });
}
export function ownBoard(player){
    
    return player.gameboard.board

}
