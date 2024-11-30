import'./styles.css';
import { displayGrid } from './UI';
import { Player } from './Player';
import { GameBoard } from './Gameboard';
import { Ship } from './Ship';
import { setupBoardClickHandler } from './GameController';


let ship= new Ship(3,"bertha")


let player1=new Player()
let player2=new Player()
setupBoardClickHandler('player2-board',player2)

player2.gameboard.placeShip(ship,'A7',3,'vertical')
displayGrid(player1.gameboard,'player1-board')
displayGrid(player1.gameboard,'start-board')
displayGrid(player2.gameboard,'player2-board')
console.log(ship.board)
console.log("asdsad")

