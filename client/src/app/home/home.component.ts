import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
   }

  title = 'Home';


    // array of all items to be paged
    // tslint:disable-next-line:member-ordering

    ngOnInit() {
    }

}
