import { Component, OnInit, Input } from '@angular/core';
import {CRUDService} from '../crud.service';
import {AuthenticationService} from '../../auth.service';
import { SocketioService } from '../../socketio.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {
  @Input() cari: any;

  constructor(public crud: CRUDService, public auth: AuthenticationService, private SocketioService: SocketioService) {
    this.crud.getData();
  }

  ngOnInit() {
  }

}
