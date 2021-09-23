import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cell } from '../model/Cell';
import { Game } from '../model/Game';
import { Preferences } from '../model/Preferences';
import { Row } from '../model/Row';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  
  game: Game;
  preferences: Preferences;

  constructor(private gameService: GameService) {
    this.preferences = new Preferences(3, 5, 7);
    this.game = new Game("","",0, new Array<Row>());
  }

  ngOnInit(): void {
  }

  start() {
    this.gameService.configure(this.preferences).subscribe((configuredGame) =>{
      this.game = Game.from(configuredGame);
      console.log(this.game);
    });
  }

  handleCellOperation(rowIndex: number, cellIndex: number) {
    console.log(rowIndex + " " + cellIndex);
  }

  hasOngoingGame() {
    return this.game.id != "";
  }
}
