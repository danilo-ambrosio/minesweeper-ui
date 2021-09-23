import { CellOperation } from "./CellOperation";
import { ClearanceOperationBuilder } from "./ClearanceOperationBuilder";
import { FlagPlacementOperationBuilder } from "./FlagPlacementOperationBuilder";
import { MouseClick } from "./MouseClick";
import { QuestionMarkPlacementOperationBuilder } from "./QuestionMarkPlacementOperationBuilder";
import { UncoveringOperationBuilder } from "./UncoveringOperationBuilder";

export abstract class CellOperationBuilder {

    public static readonly ALL = new Array<CellOperationBuilder>(new ClearanceOperationBuilder(), new UncoveringOperationBuilder(), new FlagPlacementOperationBuilder(), new QuestionMarkPlacementOperationBuilder());

    static build(rowIndex: Number, cellIndex: Number, cellStatus: string, timeElapsed: Number, mouseClick: MouseClick) : CellOperation {
        return CellOperationBuilder.ALL.filter(builder => builder.canBuild(cellStatus, mouseClick)).pop().build(rowIndex, cellIndex, timeElapsed);
    }

    abstract build(rowIndex: Number, cellIndex: Number, timeElapsed: Number): CellOperation;

    abstract canBuild(cellStatus: string, mouseEvent: MouseClick) : Boolean;

}