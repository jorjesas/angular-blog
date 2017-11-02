import { Component } from '@angular/core';
import { isNullOrUndefined } from './_helpers/util';
import { User } from './_models/user.model';
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

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();

    if (!isNullOrUndefined(this.user) && this.user.id) {
      this.isLoggedIn = true;
    }
  }

  logout() {

    this.isLoggedIn = false;
    this.authService.logout();
  }
}
