export class Preferences {

    constructor(public rows : Number, public columns: Number, public numberOfMines: Number) {
        this.rows = rows;
        this.columns = columns;
        this.numberOfMines = numberOfMines;
    }

    public minesLimit() : Number {
        return Math.ceil((this.rows.valueOf() * this.columns.valueOf()) * 0.7); 
    }
}