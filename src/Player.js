class Player{
    constructor(name='default',isComputer = false){
        this.name = name;
        this.isComputer = false;
        this.gameboard=new GameBoard()

    }
    attack(opp,coordinates){
        return opp.gameboard.receiveAttack(coordinates)

    }

}