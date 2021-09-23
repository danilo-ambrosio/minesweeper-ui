export class CellOperation {

    static readonly CLEARANCE = "CLEARANCE";
    static readonly UNCOVERING = "UNCOVERING";
    static readonly FLAG_PLACEMENT = "FLAG_PLACEMENT";
    static readonly QUESTION_MARK_PLACEMENT = "QUESTION_MARK_PLACEMENT";

    constructor(public rowIndex: Number, public cellIndex: Number, public  type: string, public timeElapsed: Number) {}

}