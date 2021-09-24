import { CellOperation } from "./CellOperation";
import { CellOperationBuilder } from "./CellOperationBuilder";
import { MouseClick } from "./MouseClick";
import { Cell } from "./Cell";

export class UncoveringOperationBuilder implements CellOperationBuilder {

    build(rowIndex: Number, cellIndex: Number): CellOperation {
        return new CellOperation(rowIndex, cellIndex, CellOperation.UNCOVERING);
    }

    canBuild(cellStatus: string, mouseEvent: MouseClick): Boolean {
        return MouseClick.Left === mouseEvent && Cell.Status.UNCOVERED != cellStatus;
    }

}