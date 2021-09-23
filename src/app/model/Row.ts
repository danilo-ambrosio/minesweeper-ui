import { Cell } from "./Cell";

export class Row {

    public static from(rows: Array<Row>) : Array<Row> {
        return rows.map(r => {
            const cells = Cell.from(r.cells);
            const row = new Row(r.index);
            row.cells = cells;
            return row;
        });
    }

    cells: Array<Cell>

    constructor(public index: Number) {
        this.cells = new Array<Cell>();
    }
}