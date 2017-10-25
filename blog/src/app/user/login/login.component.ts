import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('log in...', this.user);

    const user = this.user;
    this.userService.login(user.username, user.password).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }

}
