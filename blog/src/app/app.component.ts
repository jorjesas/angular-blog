import { Component } from '@angular/core';
import { isNullOrUndefined } from './_helpers/util';
import { User } from './_models/user.model';

import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: User = new User();
  isLoggedIn = false;

  constructor(private userService: UserService,
              private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    console.log(this.user.firstName);

    if (!isNullOrUndefined(this.user) && this.user.id) {
      this.isLoggedIn = true;
    }
  }

  logout() {

    this.isLoggedIn = false;

    this.userService.logout();
    this.authService.logout();
  }
}
