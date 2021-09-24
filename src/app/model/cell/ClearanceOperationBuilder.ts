import { CellOperation } from "./CellOperation";
import { CellOperationBuilder } from "./CellOperationBuilder";
import { MouseClick } from "./MouseClick";
import { Cell } from "./Cell";

export class ClearanceOperationBuilder implements CellOperationBuilder {

    build(rowIndex: Number, cellIndex: Number): CellOperation {
        return new CellOperation(rowIndex, cellIndex, CellOperation.CLEARANCE);
    }

    canBuild(cellStatus: string, mouseEvent: MouseClick): Boolean {
        return MouseClick.Right === mouseEvent && Cell.Status.QUESTION_MARKED === cellStatus;
    }

}