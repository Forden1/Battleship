import'./styles.css';
import { displayGrid } from './UI';
import { Player } from './Player';
import { GameBoard } from './Gameboard';
import { Ship } from './Ship';
import { setupBoardClickHandler,renderShip, firstBoardClickHandler} from './GameController';
import {shipMap }from './shipRegistry';


let ship= new Ship(3,"bertha")


export let  player1=new Player()
export let player2=new Player()
setupBoardClickHandler('player2-board',player2)
firstBoardClickHandler('')
let ship5= new Ship(5,'ship-5')
let ship4= new Ship(4,'ship-4')
let ship3= new Ship(3,'ship-3')
let ship2= new Ship(2,'ship-2')
let ship1= new Ship(2,'ship-1')

shipMap.set(ship1.name, ship1);
shipMap.set(ship2.name, ship2);
shipMap.set(ship3.name, ship3);
shipMap.set(ship4.name, ship4);
shipMap.set(ship5.name, ship5);
renderShip('ship-5')
renderShip('ship-4')
renderShip('ship-3')
renderShip('ship-2')
renderShip('ship-1')
player2.gameboard.placeShip(ship,'07',3,'vertical')
player2.gameboard.placeShip(ship,'07',3,'vertical')
player2.gameboard.placeShip(ship,'07',3,'vertical')

displayGrid(player1.gameboard,'start-board')


console.log(ship.board)
console.log("asdsad")

