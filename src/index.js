import'./styles.css';
import { displayGrid } from './UI';
import { Player } from './Player';
import { GameBoard } from './Gameboard';
import { Ship } from './Ship';
import { setupBoardClickHandler,renderShip} from './GameController';


let ship= new Ship(3,"bertha")


let player1=new Player()
let player2=new Player()
setupBoardClickHandler('player2-board',player2)
renderShip('ship-5')
let ship5= new Ship(5,'ship-5')
let ship4= new Ship(4,'ship-4')
let ship3= new Ship(3,'ship-3')
let ship2= new Ship(2,'ship-2')
let ship1= new Ship(2,'ship-1')

renderShip('ship-4')
renderShip('ship-3')
renderShip('ship-2')
renderShip('ship-1')
player2.gameboard.placeShip(ship,'07',3,'vertical')
displayGrid(player1.gameboard,'player1-board')
displayGrid(player1.gameboard,'start-board')
displayGrid(player2.gameboard,'player2-board')

console.log(ship.board)
console.log("asdsad")

