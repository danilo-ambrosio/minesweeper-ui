import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { UserAccessComponent } from './user-access/user-access.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserAccessComponent,
  },
  {
    path: 'board',
    component: GameBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
