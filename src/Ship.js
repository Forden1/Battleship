export class Ship{
    constructor(length,name='default',direction='horizontal'){
        this.length=length;
        this.hits=0;
        this.name=name
        this.direction=direction
    }
    hit(){
        this.hits++;
    }
    isSunk(){
        return this.hits >= this.length;
    }
}