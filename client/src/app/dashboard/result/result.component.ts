import { Component, OnInit } from '@angular/core';
import {CRUDService} from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from '../../auth.service';
import { SocketioService } from '../../socketio.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  logout() {
    this.auth.login = false;
    this.auth.logout();
  }
  constructor(public crud: CRUDService,
  private route: ActivatedRoute,
  public auth: AuthenticationService) {
      this.route.params.subscribe(params => {
      this.crud.getDatabyIdSocket('http://localhost:3000/vote/',params['id']);
    });
    console.log(this.auth.login);
  }

  ngOnInit() {
  }

}
