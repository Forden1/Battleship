const { Ship,GameBoard } = require('./index');

describe("ship",()=>{
    let ship
    beforeEach(() => {
        ship = new Ship(3); 
      });
    test("hitt",()=>{
        ship.hit()
        expect(ship.hits).toBe(1);
    })
    test("hitt twice",()=>{
        ship.hit()
        ship.hit()
        expect(ship.hits).toBe(2);
    })
    test("Sunk no",()=>{
        
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(false);
    })
    test("should SInk",()=>{
        ship.hit()
        ship.hit()
        ship.hit()
        ship.hit()
       
        expect(ship.isSunk()).toBe(true);
    })
})
describe("GameBoard",()=>{
    let game
    beforeEach(() => {
        game = new GameBoard(); 
      });
      test("create",()=>{
        
        expect(game.board.length).toBe(10)
        expect(game.board[0].length).toBe(10);
    })
    test("letter to number Capital",()=>{
        expect(game.letterToNum("A3")).toEqual([3,0])

    })
    test("letter to number Small",()=>{
        expect(game.letterToNum("i3")).toEqual([3,8])

    })

  
    test("recive attack",()=>{
        let ship 
        ship = new Ship(3,'bertha'); 
        game.placeShip(ship,'A3',3,'vertical')
        
        expect(game.receiveAttack("A3")).toBe("Hittt!")
    })
    test("sink ship vertical",()=>{
        let ship 
        ship = new Ship(3,'bertha'); 
        game.placeShip(ship,'A3',3,'vertical')
        game.receiveAttack("A4")
        game.receiveAttack("A5")
        
        expect(game.receiveAttack("A3")).toBe("Hit! You sunk the bertha!")
    })
    test("sink ship horizontal",()=>{
        let ship 
        ship = new Ship(3,'bertha'); 
        game.placeShip(ship,'A3',3,'horizontal')
        game.receiveAttack("B3")
        game.receiveAttack("C3")
        
        expect(game.receiveAttack("A3")).toBe("Hit! You sunk the bertha!")
    })
    test("issunk",()=>{
        let ship 
        ship = new Ship(3,'bertha'); 
        game.placeShip(ship,'A3',3,'horizontal')
        game.receiveAttack("B3")
        game.receiveAttack("C3")
        game.receiveAttack("A3")
        
        expect(game.areAllShipsSunk()).toBe(true)
    })
})