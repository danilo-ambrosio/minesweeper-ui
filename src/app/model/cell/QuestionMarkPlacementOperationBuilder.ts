import { CellOperation } from "./CellOperation";
import { CellOperationBuilder } from "./CellOperationBuilder";
import { MouseClick } from "./MouseClick";
import { Cell } from "./Cell";

export class QuestionMarkPlacementOperationBuilder implements CellOperationBuilder {

    constructor() {
    }
    
    build(rowIndex: Number, cellIndex: Number, timeElapsed: Number): CellOperation {
        return new CellOperation(rowIndex, cellIndex, CellOperation.QUESTION_MARK_PLACEMENT, timeElapsed);
    }

    canBuild(cellStatus: string, mouseEvent: MouseClick): Boolean {
        return MouseClick.Right === mouseEvent && Cell.Status.FLAGGED === cellStatus;
    }

}