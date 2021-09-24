import { Component, OnInit } from '@angular/core';
import { Game } from '../model/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-list-dialog',
  templateUrl: './game-list-dialog.component.html',
  styleUrls: ['./game-list-dialog.component.css']
})
export class GameListDialogComponent implements OnInit {

  games: Array<Game>;
  selectedGame: Game;
  
  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
    this.gameService.query().subscribe(raw => {
      this.games = Game.fromAll(raw);
    })
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  resolveDialogTitle() {
    return this.games.length === 0 ? "There is no preserved game." : "Select a game to restore";
  }
}
