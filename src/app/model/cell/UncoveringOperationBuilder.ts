import { CellOperation } from "./CellOperation";
import { CellOperationBuilder } from "./CellOperationBuilder";
import { MouseClick } from "./MouseClick";
import { Cell } from "./Cell";

export class UncoveringOperationBuilder implements CellOperationBuilder {

    build(rowIndex: Number, cellIndex: Number, timeElapsed: Number): CellOperation {
        return new CellOperation(rowIndex, cellIndex, CellOperation.UNCOVERING, timeElapsed);
    }

    canBuild(cellStatus: string, mouseEvent: MouseClick): Boolean {
        return MouseClick.Left === mouseEvent && Cell.Status.COVERED === cellStatus;
    }

}