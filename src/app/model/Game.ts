import { Cell } from "./cell/Cell";
import { Preferences } from "./Preferences";
import { Row } from "./Row";

export class Game {
    
    static empty() : Game {
        return new Game("", "", 0,
         0, new Array<Row>()); 
    }
    
    constructor(public id: string, public status: string, public startedOn: number, public timeElapsed: number, public rows: Array<Row>) {
        this.rows = rows;
    }

    public static fromAll(games: Array<Game>) {
        return games.map(game => Game.from(game));
    }

    public static from(game: Game) : Game {
        const rows = Row.from(game.rows);
        return new Game(game.id, game.status, game.startedOn, game.timeElapsed, rows);
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

    isWon() : Boolean {
        return this.status === "WON";
    }

    isLost() : Boolean {
        return this.status === "LOST";
    }

    isOver() : Boolean {
        return this.isWon() || this.isLost() || this.isEmpty();
    }

    isEmpty() : Boolean {
        return this.status === "";
    }

    startedOnDate() : Date {
        return new Date(this.startedOn);
    }
}