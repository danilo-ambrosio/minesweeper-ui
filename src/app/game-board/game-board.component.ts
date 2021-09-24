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
import { GameStatusTransition } from '../model/GameStatusTransition';
import { Timer } from '../helpers/Timer';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { GameListDialogComponent } from '../game-list-dialog/game-list-dialog.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  game: Game;
  preferences: Preferences;
  timer: Timer;
  username: string;

  constructor(private gameService: GameService, 
              private toastrService: ToastrService,
              private userService: UserService, 
              public dialog: MatDialog) {
    this.clear();
    this.username = this.userService.authenticatedUsername();
  }

  ngOnInit(): void {
  }

  clear() {
    this.timer = new Timer(0);
    this.game = Game.empty();
    this.preferences = new Preferences(3, 5, 7);
  }

  start() {
    this.gameService.configure(this.preferences).subscribe((configuredGame) => {
      this.game = Game.from(configuredGame);
      this.timer = this.timer.start(0);
    });
  }

  resume(gameId) {
    const statusTransition = new GameStatusTransition("GAME_CONTINUATION");
    this.gameService.changeStatus(gameId, statusTransition).subscribe((resumedGame) => {
      this.game = Game.from(resumedGame);
      this.timer = this.timer.start(this.game.timeElapsed);
    });
  }

  stop() {
    const statusTransition = new GameStatusTransition("GAME_PRESERVATION");
    this.gameService.changeStatus(this.game.id, statusTransition).subscribe(() => {
      this.toastrService.success("Game preserved!");
      this.clear();
    });
  }

  uncoverCell(row: Row, cell: Cell) {
    if (cell.status != Cell.Status.UNCOVERED) {
      this.dispatchCellOperation(CellOperationBuilder.build(row.index, cell.index, cell.status, MouseClick.Left));
    }
  }

  placeCellIndicator(row: Row, cell: Cell, mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    if (cell.status != Cell.Status.UNCOVERED) {
      this.dispatchCellOperation(CellOperationBuilder.build(row.index, cell.index, cell.status, MouseClick.Right));
    }
  }

  dispatchCellOperation(cellOperation: CellOperation) {
    this.gameService.performCellOperation(this.game.id, cellOperation).subscribe((updatedGame) => {
      this.handleUpdatedGame(updatedGame);
    });
  }

  openGameList() {
    const dialogRef = this.dialog.open(GameListDialogComponent);

    dialogRef.afterClosed().subscribe(selectedGame => {
      if(selectedGame) {
        this.resume(selectedGame.id);
      }
    });
  }

  handleUpdatedGame(updatedGame) {
    this.game = Game.from(updatedGame);
    if (this.game.isWon()) {
      this.toastrService.success("You won!", "", { positionClass: "toast-top-center" });
    }
    if (this.game.isLost()) {
      this.toastrService.warning("You lose!", "", { positionClass: "toast-top-center" });
    }
    if (this.game.isOver()) {
      this.timer.stop();
    }
  }

  logout() {
    this.userService.removeAuthenticatedUser();
    window.location.reload();
  }

  userTooltip() {
    return `Logged as ${this.username}`;
  }

  hasOngoingGame() {
    return !this.game.isOver();
  }

  hasGame() {
    return !this.game.isEmpty();
  }

}
