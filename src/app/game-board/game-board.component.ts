import { Component, OnInit } from '@angular/core';
import { Cell } from '../model/cell/Cell';
import { Game } from '../model/Game';
import { Preferences } from '../model/Preferences';
import { Row } from '../model/Row';
import { GameService } from '../services/game.service';
import { MouseClick } from '../model/cell/MouseClick';
import { CellOperationBuilder } from '../model/cell/CellOperationBuilder';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  
  game: Game;
  preferences: Preferences;

  constructor(private gameService: GameService) {
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
      const cellOperation = CellOperationBuilder.build(row.index, cell.index, cell.status, 10, MouseClick.Left);
      this.gameService.performCellOperation(this.game.id, cellOperation).subscribe((updatedGame) =>{
        this.game = Game.from(updatedGame);
      });
    }
  }

  placeCellIndicator(row: Row, cell: Cell, mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();

  }

  hasOngoingGame() {
    return this.game.id != "";
  }
}
