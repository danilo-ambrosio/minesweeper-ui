import { Component, OnInit } from '@angular/core';
import { Cell } from '../model/cell/Cell';
import { Game } from '../model/Game';
import { Preferences } from '../model/Preferences';
import { Row } from '../model/Row';
import { GameService } from '../services/game.service';
import { MouseClick } from '../model/cell/MouseClick';
import { CellOperationBuilder } from '../model/cell/CellOperationBuilder';
import { CellOperation } from '../model/cell/CellOperation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  
  game: Game;
  preferences: Preferences;

  constructor(private gameService: GameService, private toastrService: ToastrService) {
    this.game = Game.empty();
    this.preferences = new Preferences(3, 5, 7);
  }

  ngOnInit(): void {
  }

  start() {
    this.gameService.configure(this.preferences).subscribe((configuredGame) =>{
      this.game = Game.from(configuredGame);
      console.log(this.game);
    });
  }

  uncoverCell(row: Row, cell: Cell) {
    if(cell.status != Cell.Status.UNCOVERED) {
      this.dispatchCellOperation(CellOperationBuilder.build(row.index, cell.index, cell.status, 10, MouseClick.Left));
    }
  }

  placeCellIndicator(row: Row, cell: Cell, mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    if(cell.status != Cell.Status.UNCOVERED) {
      this.dispatchCellOperation(CellOperationBuilder.build(row.index, cell.index, cell.status, 10, MouseClick.Right));
    }
  }

  dispatchCellOperation(cellOperation: CellOperation) {
    this.gameService.performCellOperation(this.game.id, cellOperation).subscribe((updatedGame) => {
      this.handleUpdatedGame(updatedGame);
    });
  }

  handleUpdatedGame(updatedGame) {
    this.game = Game.from(updatedGame);
    if(this.game.isWon()) {
      this.toastrService.success("You won!", "", {positionClass: "toast-top-center"});
    }
    if(this.game.isLost()) {
      this.toastrService.warning("You lose!", "", {positionClass: "toast-top-center"});
    }
  }

  hasOngoingGame() {
    return !this.game.isOver();
  }
  
  hasGame() {
    return !this.game.isEmpty();
  }
}
