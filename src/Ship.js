export class Ship{
    constructor(length,name='default'){
        this.length=length;
        this.hits=0;
        this.name=name

    }
    hit(){
        this.hits++;
    }
    isSunk(){
        return this.hits >= this.length;
    }
}