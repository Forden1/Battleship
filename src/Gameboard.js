export class GameBoard{
    constructor(size=10){
        this.size=size;
        this.ships=[];
        this.hits=[];
        this.misses=[];
        this.board=this.createEmptyBoard();
        this.hitTargets =[];

    }
    createEmptyBoard(){
        const board=[]
        for(let i=0;i<this.size;i++){
            board.push(Array(this.size).fill(null))
        }
        return board
    }
    letterToNum(coordinates) {
        // Split the coordinate string into row and column parts
        const row = parseInt(coordinates[0]); // First character is row (parse as integer)
        const col = parseInt(coordinates[1]); // Second character is column (parse as integer)
        
        return [row, col];  // Return as [row, col] array
    }
    numToLetter(row, col) {
        return row.toString() + col.toString();  // Concatenate row and column into a string
    }
    

    areAllShipsSunk() {
        return this.ships.every(entry => entry.ship.isSunk());
    }
    
    
    placeShip(ship,coordinates,length,direction){
       
        const [row, col] = this.letterToNum(coordinates);
        
        if (direction=='horizontal'){
            if (this.isValidHorizontalPlacement(row,col,length)==true){
                for(let i=0;i<length;i++){
                    this.board[row][col+i]='ship'
                }
                this.ships.push({ship,coordinates:this.getHorizontalCoordinates(row,col,length)})
                return true
            }

        }
        else if(direction=='vertical'){

            if (this.isValidVerticalPlacement(row,col,length)==true){
                for(let i=0;i<length;i++){
                    this.board[row+i][col]='ship'
                }
                this.ships.push({ship,coordinates:this.getVerticalCoordinates(row,col,length)})
                return true
            }



        }
        return "failed to place th sipspsdispdip"
    }
    isValidHorizontalPlacement(row,col,length){
        if (col+length>this.size){
            return false

        }
        for(let i=0;i<length;i++){
            if(this.board[row][col+i]!==null){
                return false
            }
        }
        return true
    }
    isValidVerticalPlacement(row,col,length){
        if (row+length>this.size){
            return false

        }
        for(let i=0;i<length;i++){
            if(this.board[row+i][col]!==null){
                return false
            }
        }
        return true
    }
    getHorizontalCoordinates(row,col,length){
        let coordinates=[]
         for(let i = 0;i<length;i++){
            coordinates.push([row,col+i])
         }
         return coordinates
    
    }
    getVerticalCoordinates(row,col,length){
        let coordinates=[]
         for(let i = 0;i<length;i++){
            coordinates.push([row+i,col])
         }
         return coordinates
    
    }
    receiveAttack(coordinates){
       
        const [row, col] = this.letterToNum(coordinates);
        if (row<0||col<0||row>=this.size||col>=this.size){
            return "Invalid spot: out of bounds.";
        }
        if(this.board[row][col]=='hit' || this.board[row][col]=='miss'){
            return "Invalid spot: already attacked.";
        }
        if(this.board[row][col]==null){
            this.board[row][col]="miss"
            this.misses.push([row, col]); 
            return "MISS!!!!";
        }
        this.board[row][col]='hit'
        this.hits.push([row, col])
        for(const{ship,coordinates }of this.ships){
            if(coordinates.some(([r,c])=> r===row && c===col)){
                ship.hit()

                return ship.isSunk() ? `Hit! You sunk the ${ship.name}!` : "Hittt!";
            }
        }
    }
}