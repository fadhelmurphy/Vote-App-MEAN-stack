import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthenticationService, private router: Router) {
    if (localStorage.getItem('user')) {
      this.auth.login = true;
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    if (this.auth.login === true) {
      this.router.navigate(['/dashboard']);
    }

  }

  loginUser(e) {
    this.auth.loginUser(e);
  }


}
