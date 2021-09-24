export class Cell {
    
    public static from(cells: Array<Cell>) : Array<Cell> {
        return cells.map(cell => new Cell(cell.index, cell.status, cell.type, cell.mines));
    }

    constructor(public index: Number, public status: string, public type: string, public mines: Number) {
        
    } 

    resolveStyleClass() {
        return `cell ${this.status.toLowerCase()}`;
    }

        
    resolveTooltip() {
        if(this.status === Cell.Status.COVERED) {
            return "Right click to place a flag";
        }
        if(this.status === Cell.Status.FLAGGED) {
            return "Right click to place a question mark";
        }
        if(this.status === Cell.Status.QUESTION_MARKED) {
            return "Right click to remove the question mark";
        }
        return "";
    }


    hasIcon() {
        return this.status === Cell.Status.FLAGGED || this.status == Cell.Status.QUESTION_MARKED || this.type == "MINE";  
    }
    
    hasMines() {
        return this.mines > 0;
    }
    
    resolveIconName() {
        if(this.status === Cell.Status.FLAGGED) {
            return "flag";
        }
        if(this.status === Cell.Status.QUESTION_MARKED) {
            return "help";
        }
        if(this.type === "MINE") {
            return "error";
        }
        return "";
    }

    static Status = class {
        static readonly COVERED = "COVERED";
        static readonly UNCOVERED = "UNCOVERED";
        static readonly FLAGGED = "FLAGGED";
        static readonly QUESTION_MARKED = "QUESTION_MARKED";
    }
}