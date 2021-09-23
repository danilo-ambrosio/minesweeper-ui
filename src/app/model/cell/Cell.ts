export class Cell {
    
    public static from(cells: Array<Cell>) : Array<Cell> {
        return cells.map(cell => new Cell(cell.index, cell.status, cell.type, cell.mines));
    }

    constructor(public index: Number, public status: string, public type: string, public mines: Number) {
        
    } 

    resolveStyleClass() {
        return `cell ${this.status.toLowerCase()}`;
    }

    static Status = class {
        static readonly COVERED = "COVERED";
        static readonly UNCOVERED = "UNCOVERED";
        static readonly FLAGGED = "FLAGGED";
        static readonly QUESTION_MARKED = "QUESTION_MARKED";
    }
}