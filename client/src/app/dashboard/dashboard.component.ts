import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {CRUDService} from './crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthenticationService, private crud: CRUDService, private router: Router) {
    if (localStorage.getItem('user') === undefined) {
      this.auth.login = false;
      this.router.navigate(['/home']);
    }
  }

logout() {
  this.auth.login = false;
  this.auth.logout();
}

// tslint:disable-next-line:member-ordering
pencarian: any;
  ngOnInit() {
    if (this.auth.login === false) {
      this.router.navigate(['/login']);
    }
  }

}
