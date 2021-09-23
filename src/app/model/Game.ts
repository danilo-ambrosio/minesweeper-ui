import { Cell } from "./Cell";
import { Preferences } from "./Preferences";
import { Row } from "./Row";

export class Game {
    
    
    constructor(public id: string, public status: string, public timeElapsed: number, public rows: Array<Row>) {
        this.rows = rows;
    }

    public static from(game: Game) : Game {
        const rows = Row.from(game.rows);
        return new Game(game.id, game.status, game.timeElapsed, rows);
    }   

    generatePlaceholderCells(preferences: Preferences) {
        for(let rowIndex = 0; rowIndex < preferences.rows; rowIndex++) {
            const row = new Row(rowIndex);
            for(let cellIndex = 0; cellIndex < preferences.columns; cellIndex++) {
              row.cells.push(new Cell(cellIndex, "COVERED", "", 0));
            }
            this.rows.push(row);
        }
    }
}