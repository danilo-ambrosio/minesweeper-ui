import { CellOperation } from "./CellOperation";
import { CellOperationBuilder } from "./CellOperationBuilder";
import { MouseClick } from "./MouseClick";
import { Cell } from "./Cell";

export class ClearanceOperationBuilder implements CellOperationBuilder {

    build(rowIndex: Number, cellIndex: Number, timeElapsed: Number): CellOperation {
        return new CellOperation(rowIndex, cellIndex, CellOperation.CLEARANCE, timeElapsed);
    }

    canBuild(cellStatus: string, mouseEvent: MouseClick): Boolean {
        return MouseClick.Right === mouseEvent && Cell.Status.QUESTION_MARKED === cellStatus;
    }

}