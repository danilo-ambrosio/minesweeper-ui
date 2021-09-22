import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minesweeper-ui';

  constructor(private router: Router, private userService: UserService) {
    if(userService.hasAuthenticatedUser()) {
      this.router.navigate(['/board']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
